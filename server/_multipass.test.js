async function test() {
  const multipass = require(`./modules/multipass/index.js`);
  const stream = {
    write: (e) => {
      true;
      // console.log(`*${e}`)
    },
  };
  const generated = await multipass.preset({
    // stream: `__DUPLEX_STREAM_PLACEHOLDER__`,
    stream,
    preset: `componentNew_text`,
    query: {
      description: `a tweet component`,
      framework: `svelte`,
      components: `shadcn`,
      icons: `lucide`,
    },
  });
}
test();
