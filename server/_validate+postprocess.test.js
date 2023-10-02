async function test() {
  const validate_check = require(
    `./modules/multipass/passes/validate-check-generated-component/index.js`,
  );
  const validate_fix = require(
    `./modules/multipass/passes/validate-fix-generated-component/index.js`,
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
  let example = userInputComponents_logs.missingImportsPlusIllegalImports;
  console.dir({
    test_case_code: example.pipeline.stages["component-code"],
  });

  const validate_check_response = await validate_check.run({
    stream,
    ...example,
  });
  // console.dir({validate_check_response})

  example.pipeline.stages[validate_check_response.type] = {
    success: validate_check_response.success,
    data: validate_check_response.data,
  };

  const validate_fix_response = await validate_fix.run({
    stream,
    ...example,
  });

  console.dir(
    {
      "debug _validate+process test *************": "*****************",
      validate_fix_response,
    },
    { depth: true },
  );
}
test();
