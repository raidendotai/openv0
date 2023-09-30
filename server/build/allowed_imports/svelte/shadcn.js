const fs = require(`fs`);

async function build() {
  console.dir({ "build/allowed_imports": `svelte/shadcn` });

  // would write something like {import : [`flowbite-react` , /*any additional library required */]}

  const metadata = {
    import: [
      `$lib/components/ui`,
      `$lib/utils`,
      `svelte-motion`,
      `radix-icons-svelte`, // might be included because is in docs
    ],
  };

  fs.writeFileSync(
    `./library/components/svelte/shadcn/metadata.json`,
    JSON.stringify(metadata),
  );

  console.dir({
    build: `./build/allowed_imports/svelte/shadcn.js`,
    metadata: `./library/components/svelte/shadcn/metadata.json`,
  });
}
module.exports = { build };
