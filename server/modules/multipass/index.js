const PRESETS_MAP = require(`./presets/index.js`);

async function run(req) {
  /*
    req : {stream , query {text?,framework,components,icons} , pipeline[passes] }
  */
  console.dir({
    module: `multipass/run`,
    ...req,
  });
  let execution_multipass = {};
  for (let [index, pass] of req.passes.entries()) {
    console.log(`> pass ${index}/${req.passes.length - 1}`);
    const execution_pass = {
      index,
      response: await require(`./passes/${pass}/index.js`).run({
        stream: req.stream,
        query: req.query,
        pipeline: execution_multipass,
      }),
    };
    execution_multipass[pass] = execution_pass;
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
