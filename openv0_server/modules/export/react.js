const fs = require("fs");
const path = require("path");
const GeneratedComponentModel = require(`../db/models/generated_component.model.js`);

const validate_component = require(`./validate_component.js`);

require("dotenv").config();

function _mkdir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}

function _randomId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


async function save_component(query) {
  if (!query.code.length) return false;

  await GeneratedComponentModel.create(query);
  console.info(query.componentId);
}
async function dump_webapp() {
  // process.env.REACT_WEBAPP_DIR
  // writes components + metadata + general dump file in webapp
  console.dir({
    event: `> ./modules/export/react dump_webapp() started`,
    warn: "if webapp crashes because of invalid generated components\nadd componentId and version to ./generated/export_ignore.txt\nthen run `node export_refresh.js` from server folder",
  });

  fs.rmSync(`${process.env.REACT_WEBAPP_DIR}/src/components/openv0_generated/`, {
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

  // const components_list = await GeneratedComponentModel.find({});

  // const dump = components_list.map(async (comp) => {
  //   // make metadata.
  //   const metadata_json = {
  //     componentId: comp.componentId,
  //     iterations: components_list.filter((e) => e.componentId === comp.componentId)
  //       .sort()
  //       .map((component_metadata) => {
  //         const validation_status = validate_component.validate_babel(
  //           component_metadata.code
  //         );
  //         if (!validation_status) {
  //           console.dir({
  //             babel_validation_error: `./generated/components/${comp.name}/${
  //               json_file.split(".json")[0]
  //             }.tsx`,
  //           });
  //           return false;
  //         }
  //         if (
  //           EXPORT_IGNORE.includes(
  //             `${comp.name} ${component_metadata.version}`.trim()
  //           ) ||
  //           EXPORT_IGNORE.includes(comp.mame)
  //         )
  //           return false;

  //         return component_metadata
  //       })
  //       .filter((e) => e),
  //   };
  //   //console.dir(metadata_json)
  //   // make component dir from slug, save metadata.json

  //   // _mkdir(
  //   //   `${process.env.REACT_WEBAPP_DIR}/src/components/openv0_generated/${comp.slug}`
  //   // );

  //   // fs.writeFileSync(
  //   //   `${process.env.REACT_WEBAPP_DIR}/src/components/openv0_generated/${comp.slug}/metadata.json`,
  //   //   JSON.stringify(metadata_json)
  //   // );

  //   // copy tsx files
  //   components_list.filter((e) => e.componentId === comp.componentId).map((tsx_file) => {
  //     const validation_status = validate_component.validate_babel(
  //       tsx_file.code
  //     );
  //     if (!validation_status) {
  //       console.info(`Not valid code: ${tsx_file.code}`);
  //       return false;
  //     }

  //     if (
  //       EXPORT_IGNORE.includes(`${comp.name} ${tsx_file.version}`.trim()) ||
  //       EXPORT_IGNORE.includes(comp.mame)
  //     )
  //       return false;

  //     // fs.writeFileSync(
  //     //   `${process.env.REACT_WEBAPP_DIR}/src/components/openv0_generated/${comp.slug}/${tsx_file.version}.tsx`,
  //     //   tsx_file.code
  //     // );
  //   });
  // });
  fs.writeFileSync(
    `${process.env.REACT_WEBAPP_DIR}/src/components/openv0_generated/signal.tsx`,
    `export const signal = '${_randomId(10)}';`
  )
}

module.exports = {
  save_component,
  dump_webapp,
};
