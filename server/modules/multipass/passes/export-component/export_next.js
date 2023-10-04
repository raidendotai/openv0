const fs = require(`fs`);
require("dotenv").config();

function _mkdir(path) {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  } catch (e) {
    true;
  }
}

async function export_component(req) {
  console.dir({
    warning: `exports not yet defined for Next framework`,
  });
  return {
    exported: false,
  };
}
module.exports = {
  export_component,
};
