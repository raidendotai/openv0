const PRESETS_MAP = require(`./presets/index.js`);
require("dotenv").config();
const log = parseInt(process.env.OPENV0__COLLECT_UIRAY)
  ? require(`../log/index.js`).uiray
  : require(`../log/index.js`).passThrough;

async function run(req) {
  /*
    req : {
      stream ,
      query {text?,framework,components,icons},
      passes ,
      preset? //for log only
    }
  */

  console.dir({
    module: `multipass/run`,
    status: `starting`,
    query: req.query,
    preset: req.preset ? req.preset : false,
    passes: req.passes,
  });

  let execution_multipass = {
    passes: {},
    stages: {},
  };
  for (let [index, pass] of req.passes.entries()) {
    console.log(`> pass ${index}/${req.passes.length - 1}`);
    const response = await require(`./passes/${pass}/index.js`).run({
      stream: req.stream,
      query: req.query,
      pipeline: execution_multipass,
    });
    const execution_pass = {
      index,
      response,
    };
    execution_multipass.passes[pass] = execution_pass;
    execution_multipass.stages[response.type] = {
      success: response.success,
      data: response.data,
    };
  }

  await log({
    query: req.query,
    preset: req.preset ? req.preset : false,
    passes: req.passes,
    execution: execution_multipass,
  });

  console.dir({
    module: `multipass/run`,
    status: `done`,
  });

  /*
  console.log(
    `*********************** multipass debug *************************`,
  );
  console.dir({ execution_multipass }, { depth: null });
  require("fs").writeFileSync(
    `_multipass_output_example_${Date.now()}.json`,
    JSON.stringify(execution_multipass, null, "\t"),
  );
  */
}

async function preset(req) {
  /* req : {stream,preset``,query{...}} */
  console.dir({
    module: `multipass/preset`,
    preset: {
      name: req.preset,
      description: PRESETS_MAP[req.preset].description,
    },
  });
  return await run({
    stream: req.stream,
    preset: {
      name: req.preset,
      description: PRESETS_MAP[req.preset].description,
    }, // <- for log only
    query: req.query,
    passes: PRESETS_MAP[req.preset].passes,
  });
}

module.exports = {
  preset,
  run,
};
