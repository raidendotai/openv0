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
  const output_dir = `${
    process.env.WEBAPP_ROOT
  }/src/components/openv0_generated/${
    req.pipeline.stages[`component-design-task`].data.name
  }`;
  const output_file =
    `${output_dir}/${req.pipeline.stages[`component-design-task`].data.name}_` +
    `${req.pipeline.stages[`component`].data.version}.tsx`;
  _mkdir(output_dir);
  fs.writeFileSync(output_file, req.pipeline.stages[`component`].data.code);
  console.dir({
    exported: output_file,
  });
  return {
    exported: output_file,
  };
}
module.exports = {
  export_component,
};
