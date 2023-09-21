import "dotenv/config";
import mongoose from "mongoose";
import fs from "node:fs";
import mongooseJSONSchema from "mongoose-schema-jsonschema";
import {
  createApp,
  createRouter,
  readBody,
  getQuery,
  eventHandler,
  toNodeListener,
} from "h3";
import { createProxyServer } from "httpxy";
import { listen } from "listhen";
import consola from "consola";
import { waitForPort } from "get-port-please";
import * as generate from "./generate.mjs";
import * as export_react from "./modules/export/react.mjs";

mongooseJSONSchema(mongoose);

const app = createApp();
const router = createRouter();
app.use(router);

const EXPORT_PING_INTERVAL = parseInt(
  process.env.REACT_WEBAP_COMPONENT_PING_INTERVAL_MS,
);

let EXPORT_PING_STATUS = true;

async function export_validity_check(query) {
  if (!EXPORT_PING_STATUS) {
    console.dir({
      export_check_failed: {
        component: query,
        message: `did not received ping back from webapp after component export;\ngenerated component likely has issues (ie. syntax; nonexistent imports: ...)\nadding component to ./generated/export_ignore.txt and refreshing webapp exports`,
      },
    });
    fs.appendFileSync(
      `./generated/export_ignore.txt`,
      `\n${query.componentId} ${query.version}`,
    );
    await export_react.dump_webapp();
  }
}

async function exported_new_component(query) {
  console.dir({
    export: {
      component: query,
      message: `exported new component to webapp; waiting for ping back in ${
        EXPORT_PING_INTERVAL / 1e3
      } secs or will remove\n(in case generated component has issues)`,
    },
  });
  EXPORT_PING_STATUS = false;
  await new Promise((r) => setTimeout(r, EXPORT_PING_INTERVAL));
  export_validity_check(query);
}

router.post(
  `/component/new`,
  eventHandler(async (event) => {
    const body = await readBody(event);
    const response = await generate.new_component({
      query: body.query,
    });
    exported_new_component({
      componentId: response.componentId,
      version: response.version,
    });
    return response;
  }),
);

router.post(
  `/component/iterate`,
  eventHandler(async (event) => {
    const body = await readBody(event);
    const response = await generate.iterate_component({
      componentId: body.componentId,
      query: body.query,
    });
    exported_new_component({
      componentId: response.componentId,
      version: response.version,
    });
    return response;
  }),
);

// is used after generating and exporting a new component/iteration
// if ping not received within time interval, component is likely invalid (ie. hallucinated imports)
// and component is added to generated/export_ignore.txt, then webapp exports are refreshed
router.get(
  `/component/ping`,
  eventHandler(async (event) => {
    const query = getQuery(event);
    // exported_new_component({
    //   componentId: query.componentId,
    //   version: query.version,
    // });
    console.dir({
      ping: `received ping from webapp; components loaded successfully :)`,
      ...query,
    });
    EXPORT_PING_STATUS = true;
    return { status: true };
  }),
);

const viteDevPort = "5173";
const uiProxy = createProxyServer({
  target: `http://localhost:${viteDevPort}`,
});

app.use(
  eventHandler((event) => {
    return uiProxy.web(event.node.req, event.node.res);
  }),
);

consola.info(`Waiting for vite dev port ${viteDevPort} to be ready...`);

await waitForPort(viteDevPort, { retries: 10, delay: 500, host: "localhost" });

await listen(toNodeListener(app));
