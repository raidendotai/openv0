const fs = require(`fs`);

async function build() {
  console.dir({ "build/allowed_imports": `next/flowbite` });

  // would write something like {import : [`flowbite-react` , /*any additional library required */]}

  const metadata = {
    import: [
      `flowbite-react`,
      `react-icons`, // is in docs, might be used in generated code, ie. "react-icons/fa"
      `framer-motion`,
    ],
  };

  fs.writeFileSync(
    `./library/components/next/flowbite/metadata.json`,
    JSON.stringify(metadata),
  );

  console.dir({
    build: `./build/allowed_imports/next/flowbite.js`,
    metadata: `./library/components/next/flowbite/metadata.json`,
  });
}
module.exports = { build };
