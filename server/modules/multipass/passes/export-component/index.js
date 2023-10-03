const path = require("path");
async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  console.dir({
    __debug_export_component: "*******************",
  });

  return {
    type: `?`,
    success: true,
    data: {},
  };
}

module.exports = {
  run,
};
