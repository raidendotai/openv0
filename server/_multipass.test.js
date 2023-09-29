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
    preset: `componentNew_description`,
    query: {
      description: `a sleek invoice table`,
      framework: `react`,
      components: `nextui`,
      icons: `lucide`,
    },
  });
}
test();
