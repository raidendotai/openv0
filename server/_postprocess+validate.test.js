async function test() {
  const postprocess = require(
    `./modules/multipass/passes/postprocess-generated-component/index.js`,
  );
  const validate = require(
    `./modules/multipass/passes/validate-generated-component/index.js`,
  );

  const stream = {
    // used to stream updates to frontend ; if not needed pass this instead
    write: (e) => {
      true;
    },
  };

  const userInputComponents_logs = require(
    `./_example_component_problems_logs.test.js`,
  );
  console.dir(userInputComponents_logs);

  process.exit(0);
  const generated = await postprocess.run({
    stream,
  });
}
test();
