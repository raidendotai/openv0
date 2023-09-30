const fs = require(`fs`);

async function build() {
  console.dir({ "build/allowed_imports": `next/nextui` });

  // would write something like {import : [`flowbite-react` , /*any additional library required */]}

  const metadata = {
    import: [
      `@nextui-org/`, //checks in multipass validation are prefix style ; next+nextui needs individual component imports
      `framer-motion`,
    ],
  };

  fs.writeFileSync(
    `./library/components/next/nextui/metadata.json`,
    JSON.stringify(metadata),
  );

  console.dir({
    build: `./build/allowed_imports/next/nextui.js`,
    metadata: `./library/components/next/nextui/metadata.json`,
  });
}
module.exports = { build };
