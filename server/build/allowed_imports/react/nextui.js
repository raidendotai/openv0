const fs = require(`fs`);

async function build() {
  console.dir({ "build/allowed_imports": `react/nextui` });

  // would write something like {import : [`flowbite-react` , /*any additional library required */]}

  const metadata = {
    import: [`@nextui-org/react`, `react-day-picker`, `framer-motion`],
  };

  fs.writeFileSync(
    `./library/components/react/nextui/metadata.json`,
    JSON.stringify(metadata),
  );

  console.dir({
    build: `./build/allowed_imports/react/nextui.js`,
    metadata: `./library/components/react/nextui/metadata.json`,
  });
}
module.exports = { build };
