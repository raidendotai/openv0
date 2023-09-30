const fs = require(`fs`);

async function build() {
  console.dir({ "build/allowed_imports": `react/flowbite` });

  // would write something like {import : [`flowbite-react` , /*any additional library required */]}

  const metadata = {
    import: [
      `flowbite-react`,
      `react-icons`, // is in docs, might be used in generated code
      `tailwind-merge`,
      `react-day-picker`,
      `framer-motion`,
    ],
  };

  fs.writeFileSync(
    `./library/components/react/flowbite/metadata.json`,
    JSON.stringify(metadata),
  );

  console.dir({
    build: `./build/allowed_imports/react/flowbite.js`,
    metadata: `./library/components/react/flowbite/metadata.json`,
  });
}
module.exports = { build };
