async function test() {
  const validate = require(
    `./modules/multipass/passes/validate-check-generated-component/index.js`,
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
  const example = userInputComponents_logs.duplicateImports;
  console.dir(example.pipeline.stages["component-code"]);

  const generated = await validate.run({
    stream,
    ...example,
  });
}
test();
