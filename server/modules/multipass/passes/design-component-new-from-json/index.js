const path = require("path");
async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));
  return {
    type: `component-design-task`,
    success: true,
    data: {},
  };
}

module.exports = {
  run,
};
