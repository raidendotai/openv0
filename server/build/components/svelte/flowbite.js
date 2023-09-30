const fs = require(`fs`);
const markdownIt = require("markdown-it")();

/*
  ./build/gits/themesberg$flowbite-svelte/src/routes/docs/components

*/
function extractCodeBlocks(markdownContent, lang) {
  const tokens = markdownIt.parse(markdownContent, {});

  let tsxCodeBlocks = [];
  let currentCodeBlock = "";

  for (const token of tokens) {
    if (token.type === "fence" && token.info.startsWith(lang)) {
      currentCodeBlock = token.content;
      tsxCodeBlocks.push(currentCodeBlock);
    } else if (currentCodeBlock && token.type === "fence") {
      currentCodeBlock = "";
    } else if (currentCodeBlock) {
      currentCodeBlock += "\n" + token.content;
    }
  }

  return tsxCodeBlocks;
}

async function build() {
  console.dir({ "build/components": `svelte/flowbite` });
  const db = fs
    .readdirSync(
      `./build/gits/themesberg$flowbite-svelte/src/routes/docs/components`,
    )
    .filter((e) => e.includes(`.md`))
    //.filter(e=>e.includes(`button`))
    .map((doc_file) => {
      const index = fs.readFileSync(
        `./build/gits/themesberg$flowbite-svelte/src/routes/docs/components/${doc_file}`,
        `utf-8`,
      );
      let meta = {};
      index
        .split("---")[1]
        .trim()
        .split("\n")
        .map((e) => {
          const split = e
            .trim()
            .split(":")
            .map((_e) => _e.trim());
          if (split[0] === `component_title`) meta.name = split[1];
          else if (split[0] === `description`) meta.description = split[1];
        });

      // inconsistent docs sometimes
      let split_sub;
      if (index.includes(`## Setup`)) split_sub = `## Setup`;
      else if (index.includes(`## Set up`)) split_sub = `## Set up`;
      else {
        console.dir({
          skip: doc_file,
        });
        return false;
      }
      const _import = index.split(split_sub)[1].split(`##`)[0].trim();
      const codeBlocks = index
        .split(split_sub)[1]
        .split(`##`)
        .slice(1)
        .filter((e) => e.includes("```svelte"))
        .map((e) => e.trim())
        .map((block) => {
          return {
            source:
              block
                .split("\n")[0]
                .replaceAll(`#`, ``)
                .trim()
                .toLowerCase()
                .replaceAll(` `, `-`) + ".svelte",
            code: extractCodeBlocks(block, `svelte`)[0],
          };
        });

      return {
        name: meta.name,
        description: meta.description,
        docs_path: `./build/gits/themesberg$flowbite-svelte/src/routes/docs/components/${doc_file}`,
        docs: {
          import: {
            source: `${doc_file.split(".")[0]}.svelte`,
            code: extractCodeBlocks(_import, `svelte`)[0],
          },
          use: [codeBlocks[0]].filter(
            (block) =>
              !block.source.includes(`custom`) &&
              !block.code.includes(`./imageData/`) &&
              !block.code.includes(`$app/stores`),
          ),
          examples: codeBlocks
            .slice(1)
            .filter(
              (block) =>
                !block.source.includes(`custom`) &&
                !block.code.includes(`./imageData/`) &&
                !block.code.includes(`$app/stores`),
            ),
        },
      };
    })
    .filter((e) => e);

  fs.writeFileSync(
    `./library/components/svelte/flowbite/dump.json`,
    JSON.stringify(db),
  );
  console.dir({
    build: `./build/components/svelte/flowbite.js`,
    dump: `./library/components/svelte/flowbite/dump.json`,
  });
}
module.exports = { build };
