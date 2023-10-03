async function test() {
  const stream = {
    // used to stream updates to frontend ; if not needed pass this instead
    write: (e) => {
      true;
    },
  };

  const execution_multipass_logs = require(
    `./_multipass_output_example_1696334567729.json`,
  );

  console.dir(execution_multipass_logs, { depth: null });

  const store_response = await require(
    `./modules/multipass/passes/export-component/index.js`,
  ).run({
    stream,
    stream: stream,
    query: {
      description: `a simple paragraph`,
      framework: `react`,
      components: `shadcn`,
      icons: `lucide`,
    },
    pipeline: execution_multipass_logs,
  });
  console.dir({ store_response });
}
test();
