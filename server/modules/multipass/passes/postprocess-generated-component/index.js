const path = require("path");
async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));
  console.dir(req);
  return "postproc";
}

module.exports = {
  run,
};
