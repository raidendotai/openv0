const path = require(`path`);

/*
  picks from `component-validation-fix` pass
  returns `component` type, with name / version (timestamp) etc

*/

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));
  return {
    type: `component`,
    success: true,
    data: {},
  };
}

module.exports = {
  run,
};
