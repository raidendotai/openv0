const path = require("path");
async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));
  return "gen_com_new";
}

module.exports = {
  run,
};
