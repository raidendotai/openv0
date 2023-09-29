const path = require("path");
async function run(req) {
  /*
    postprocess:
      - used components that arent imported but should be
      - 'use client' for react/next
      - imports that should be removed because they dont exist (< leave this for validation pass)
  */
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));
  console.dir(req);
  return {
    type: `component`,
    success: true,
    data: {},
  };
}

module.exports = {
  run,
};
