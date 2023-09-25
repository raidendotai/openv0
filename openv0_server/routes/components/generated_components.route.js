const fs = require("fs");
const { Router } = require("express");
const LogModel = require("../../modules/db/models/generated_component.model.js");
const generate = require(`../../generate.js`);
const export_react = require(`../../modules/export/react.js`);

const router = Router();

const EXPORT_PING_INTERVAL = parseInt(
  process.env.REACT_WEBAP_COMPONENT_PING_INTERVAL_MS
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
      `\n${query.componentId} ${query.version}`
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

router.get("/", async (req, res) => {
  try {
    res.json((await LogModel.find({})).sort((a, b) => b.version - a.version));
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:componentId", async (req, res) => {
  try {
    const components = await LogModel.find({
      componentId: req.params.componentId,
    });
    if (components.length === 0) {
      res.status(404).json({ message: `Component ${req.params.componentId} not found` });
      return;
    }
    res.json({
      ...components[0].toObject(),
      iterations: components.sort(),
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post(`/new`, async (req, res) => {
  try {
    const response = await generate.new_component({
      query: req.body.query,
    });
    exported_new_component({
      componentId: response.componentId,
      version: response.version,
    });
    res.json(response);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post(`/iterate`, async (req, res) => {
  try {
    const response = await generate.iterate_component({
      componentId: req.body.componentId,
      query: req.body.query,
    });
    exported_new_component({
      componentId: response.componentId,
      version: response.version,
    });
    res.json(response);
  } catch (e) {
    res.status(500).json(e);
  }
});

// is used after generating and exporting a new component/iteration
// if ping not received within time interval, component is likely invalid (ie. hallucinated imports)
// and component is added to generated/export_ignore.txt, then webapp exports are refreshed

router.get(`/ping`, async (req, res) => {
  /*
		exported_new_component({
			componentId: req.query.componentId,
			version: req.query.version,
		})
		*/
  console.dir({
    ping: `received ping from webapp; components loaded successfully :)`,
    ...req.query,
  });
  EXPORT_PING_STATUS = true;
  res.json({ status: true });
});

module.exports = router;
