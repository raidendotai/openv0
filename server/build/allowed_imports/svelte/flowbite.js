const fs = require(`fs`);

async function build() {
  console.dir({ "build/allowed_imports": `svelte/flowbite` });

  // would write something like {import : [`flowbite-react` , /*any additional library required */]}

  const metadata = {
    import: [
      `flowbite-svelte`,
      `flowbite-svelte-icons`, // is in docs, might be used in generated code
      `svelte-motion`,
    ],
  };

  fs.writeFileSync(
    `./library/components/svelte/flowbite/metadata.json`,
    JSON.stringify(metadata),
  );

  console.dir({
    build: `./build/allowed_imports/svelte/flowbite.js`,
    metadata: `./library/components/svelte/flowbite/metadata.json`,
  });
}
module.exports = { build };
