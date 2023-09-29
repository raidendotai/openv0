const PRESETS_MAP = require(`./presets/index.js`);

async function run(req) {
  /*
    req : {stream , query {text?,framework,components,icons} , pipeline[passes] }
  */
  console.dir({
    module: `multipass/run`,
    ...req,
  });
  let execution_multipass = {
    passes : {},
    stages: {},
  }
  for (let [index, pass] of req.passes.entries()) {
    console.log(`> pass ${index}/${req.passes.length - 1}`);
    const response = await require(`./passes/${pass}/index.js`).run({
      stream: req.stream,
      query: req.query,
      pipeline: execution_multipass,
    })
    const execution_pass = {
      index,
      response,
    };
    execution_multipass.passes[pass] = execution_pass;
    execution_multipass.stages[response.type] = {
      success : response.success,
      data : response.data,
    }
  }

  console.log(
    `*********************** multipass debug *************************`,
  );
  console.dir({ execution_multipass }, { depth: null });
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
    query: req.query,
    passes: PRESETS_MAP[req.preset].passes,
  });
}

module.exports = {
  preset,
  run,
};
