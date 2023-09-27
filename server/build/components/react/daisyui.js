const fs = require(`fs`);
async function build() {
  console.dir({ skip: `react/daisyui` });
  const db = fs
    .readdirSync(`./build/gits/daisyui$react-daisyui/src`)
    .filter((e) => !e.includes(`.`))
    .filter((e) => e.includes(`Button`))
    .map((component_dir) => {
      try {
        const meta = fs.readFileSync(
          `./build/gits/daisyui$react-daisyui/src/${component_dir}/${component_dir}.stories.tsx`,
          `utf-8`,
        );

        const codeBlocks = meta
          .split(`export const `)
          .slice(1)
          .map((block) => {
            const __name = block.split(`:`)[0].trim();
            if (block.includes(`${__name}.args`)) return false; //<---- see Button example
            if (!block.includes(`return`)) return false; //<----- see ButtonGroup example
            return {
              source: block.split(`:`)[0].trim().toLowerCase() + ".tsx",
              code: block
                .trim()
                .split(`\n`)
                .slice(1, -1)
                .join(`\n`)
                .replaceAll(`{...args}`, ``),
            };
          })
          .filter((e) => e);
        if (!codeBlocks.length) return false;

        return {
          name: component_dir,
          description: component_dir,
          docs_path: `./build/gits/daisyui$react-daisyui/src/${component_dir}/${component_dir}.stories.tsx`,
          docs: {
            import: {
              source: false,
              code: false,
            },
            use: [codeBlocks[0]],
            examples: codeBlocks.slice(1),
          },
        };
      } catch (e) {
        console.log(`skip : no stories docs entry for : ${component_dir}`);
        return false;
      }
    })
    .filter((e) => e);

  console.dir(db, { depth: null });
}
module.exports = { build };
