const path = require(`path`);

/*
  simple pass through for now; augment later

  picks from `component-validation-fix` pass
  returns `component` type, with name / version (timestamp) etc

*/

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  return {
    type: `component`,
    success: req.pipeline.stages[`component-validation-fix`].success,
    data: {
      version: `${Date.now()}`,
      code: req.pipeline.stages[`component-validation-fix`].data.code,
    },
  };
}

module.exports = {
  run,
};
