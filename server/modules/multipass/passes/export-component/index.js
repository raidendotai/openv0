const path = require("path");

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  if (!req.pipeline.stages[`component`].success) {
    return {
      type: `component-export`,
      success: false,
      data: {},
    };
  }

  const export_response = await require(
    `./export_${req.query.framework}.js`,
  ).export_component(req);
  return {
    type: `component-export`,
    success: true,
    data: export_response,
  };
}

module.exports = {
  run,
};
