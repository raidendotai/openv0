const fs = require(`fs`);

async function build() {
  console.dir({ "build/allowed_imports": `react/shadcn` });

  // would write something like {import : [`flowbite-react` , /*any additional library required */]}

  const metadata = {
    import: [
      `@/components/ui/`, // checks in multipass postprocess/validation are prefix style
      `@/lib/utils`,
      `@radix-ui/react-dropdown-menu`,
      `react-day-picker`,
      `framer-motion`,
    ],
  };

  fs.writeFileSync(
    `./library/components/react/shadcn/metadata.json`,
    JSON.stringify(metadata),
  );

  console.dir({
    build: `./build/allowed_imports/react/shadcn.js`,
    metadata: `./library/components/react/shadcn/metadata.json`,
  });
}
module.exports = { build };
