import fs from "node:fs";

import * as validate_component from "./validate_component.mjs";

// export all generated stuff to react app folder
// target react app folder specified in .env : process.env.REACT_WEBAPP_DIR
import "dotenv/config";

function _mkdir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}

function _listdir(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

_mkdir(`./generated/`);
_mkdir(`./generated/components`);

async function save_component(query) {
  if (!query.code.length) return false;

  _mkdir(`./generated/components/${query.componentId}`);

  // writes metadata
  fs.writeFileSync(
    `./generated/components/${query.componentId}/${query.version}.json`,
    JSON.stringify(query),
  );

  // writes tsx locally
  fs.writeFileSync(
    `./generated/components/${query.componentId}/${query.version}.tsx`,
    query.code,
  );

  console.dir({
    saved: {
      metadata: `./generated/components/${query.componentId}/${query.version}.json`,
      component: `./generated/components/${query.componentId}/${query.version}.tsx`,
    },
  });
}
async function dump_webapp() {
  // process.env.REACT_WEBAPP_DIR
  // writes components + metadata + general dump file in webapp
  console.dir({
    event: `> ./modules/export/react dump_webapp() started`,
    warn: "if webapp crashes because of invalid generated components\nadd componentId and version to ./generated/export_ignore.txt\nthen run `node export_refresh.js` from server folder",
  });

  fs.rmSync(`${process.env.REACT_WEBAPP_DIR}/src/components/openv0_generated`, {
    recursive: true,
    force: true,
  });
  _mkdir(`${process.env.REACT_WEBAPP_DIR}/src/components/openv0_generated`);

  const EXPORT_IGNORE = fs
    .readFileSync(`./generated/export_ignore.txt`, "utf-8")
    .trim()
    .split("\n")
    .map((e) => e.trim())
    .filter((e) => e.length);

  console.dir({
    EXPORT_IGNORE: { "./generated/export_ignore.txt": EXPORT_IGNORE },
  });

  const components_list = _listdir(`./generated/components`);

  const components = components_list.map((dir) => {
    return {
      name: dir.toLowerCase(), // slug
      title: dir,
      desc: "",
      versions: fs
        .readdirSync(`./generated/components/${dir}`)
        .filter((e) => e.endsWith(`.tsx`))
        .sort()
        .map((e) => {
          const version = e.split(`.tsx`)[0];
          if (
            EXPORT_IGNORE.includes(`${dir} ${version}`.trim()) ||
            EXPORT_IGNORE.includes(dir)
          )
            return false;
          return version;
        })
        .filter((e) => e),
    };
  });

  // make and export general dump
  const generated_components_dump = { openv0_components: components };
  // make and export components + metadata

  fs.writeFileSync(
    `${process.env.REACT_WEBAPP_DIR}/src/components/generated_components_dump.json`,
    JSON.stringify(generated_components_dump),
  );

  components_list.map((dir) => {
    // make metadata.
    const metadata_json = {
      componentId: dir,
      iterations: fs
        .readdirSync(`./generated/components/${dir}`)
        .filter((e) => e.endsWith(`.json`))
        .sort()
        .map((json_file) => {
          const component_metadata = JSON.parse(
            fs.readFileSync(
              `./generated/components/${dir}/${json_file}`,
              "utf-8",
            ),
          );
          const validation_status = validate_component.validate_babel(
            fs.readFileSync(
              `./generated/components/${dir}/${
                json_file.split(".json")[0]
              }.tsx`,
              "utf-8",
            ),
          );
          if (!validation_status) {
            console.dir({
              babel_validation_error: `./generated/components/${dir}/${
                json_file.split(".json")[0]
              }.tsx`,
            });
            return false;
          }
          if (
            EXPORT_IGNORE.includes(
              `${dir} ${component_metadata.version}`.trim(),
            ) ||
            EXPORT_IGNORE.includes(dir)
          )
            return false;

          return {
            version: component_metadata.version,
            prompt: component_metadata.prompt,
            timestamp: component_metadata.timestamp,
            code: component_metadata.code,
          };
        })
        .filter((e) => e),
    };
    //console.dir(metadata_json)
    // make component dir from slug, save metadata.json

    _mkdir(
      `${
        process.env.REACT_WEBAPP_DIR
      }/src/components/openv0_generated/${dir.toLowerCase()}`,
    );

    fs.writeFileSync(
      `${
        process.env.REACT_WEBAPP_DIR
      }/src/components/openv0_generated/${dir.toLowerCase()}/metadata.json`,
      JSON.stringify(metadata_json),
    );

    // copy tsx files
    fs.readdirSync(`./generated/components/${dir}`)
      .filter((e) => e.endsWith(`.tsx`))
      .map((tsx_file) => {
        const validation_status = validate_component.validate_babel(
          fs.readFileSync(`./generated/components/${dir}/${tsx_file}`, "utf-8"),
        );
        if (!validation_status) {
          console.dir({
            babel_validation_error: `./generated/components/${dir}/${tsx_file}`,
          });
          return false;
        }

        if (
          EXPORT_IGNORE.includes(
            `${dir} ${tsx_file.split(".tsx")[0]}`.trim(),
          ) ||
          EXPORT_IGNORE.includes(dir)
        )
          return false;

        fs.copyFileSync(
          `./generated/components/${dir}/${tsx_file}`,
          `${
            process.env.REACT_WEBAPP_DIR
          }/src/components/openv0_generated/${dir.toLowerCase()}/${tsx_file}`,
        );
      });
  });
}

export { save_component, dump_webapp };
