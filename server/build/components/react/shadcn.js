/* builds json dump for react/shadcn , using ../../gits/shadcn-ui */
const fs = require(`fs`);
const path = require("path");
const markdownIt = require("markdown-it")();

function extractTsxCodeBlocks(markdownFilePath) {
  const markdownContent = fs.readFileSync(markdownFilePath, "utf-8");
  const tokens = markdownIt.parse(markdownContent, {});

  let tsxCodeBlocks = [];
  let currentCodeBlock = "";

  for (const token of tokens) {
    if (token.type === "fence" && token.info === "tsx") {
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

async function build_from_docs_and_examples() {
  const shadcn_examples_files = fs.readdirSync(
    `./build/gits/shadcn-ui$ui-openv0remix/examples`,
  );

  return (
    await Promise.all(
      fs
        .readdirSync(`./build/gits/shadcn-ui$ui-openv0remix/docs`)
        .map(async (file) => {
          const slug = file.split(".mdx")[0];

          const tsx_blocks_docs = extractTsxCodeBlocks(
            path.join(`./build/gits/shadcn-ui$ui-openv0remix/docs`, file),
          ).map((block) => {
            return {
              source: file,
              code: block
                .trim()
                .replaceAll(`"@/registry/default/ui/`, `"@/components/ui/`),
            };
          });

          let meta = {};
          fs.readFileSync(
            path.join(`./build/gits/shadcn-ui$ui-openv0remix/docs`, file),
            "utf-8",
          )
            .split("---")[1]
            .trim()
            .split("\n")
            .map((e) => {
              const split = e
                .trim()
                .split(":")
                .map((_e) => _e.trim());
              if (split[0] === `title`) meta.title = split[1];
              else if (split[0] === `description`) meta.description = split[1];
              else if (split[0] === `component`)
                meta.component = split[1] === "true" ? true : false;
            });

          if (!tsx_blocks_docs || !tsx_blocks_docs.length) return false;
          if (!meta.component) return false;

          const tsx_blocks_examples = shadcn_examples_files
            .filter((f) => f.startsWith(slug))
            .map((f) => {
              return {
                source: f,
                code: fs
                  .readFileSync(
                    path.join(
                      `./build/gits/shadcn-ui$ui-openv0remix/examples`,
                      f,
                    ),
                    "utf-8",
                  )
                  .trim()
                  .replaceAll(`"@/registry/default/ui/`, `"@/components/ui/`),
              };
            });

          return {
            name: meta.title,
            description: meta.description,
            docs_path: path.join(
              `./build/gits/shadcn-ui$ui-openv0remix/docs`,
              file,
            ),
            docs: {
              import: tsx_blocks_docs[0],
              use: tsx_blocks_docs
                .slice(1)
                .filter(
                  (__block) =>
                    !__block.code.includes(`@/registry/new-york/`) &&
                    !__block.code.includes(`@/components/icons`) &&
                    !__block.code.includes(`next`) &&
                    !__block.code.includes(`next`) &&
                    !__block.code.includes(`@hookform/`),
                ),
              examples: tsx_blocks_examples.filter(
                (__block) =>
                  !__block.code.includes(`@/registry/new-york/`) &&
                  !__block.code.includes(`@/components/icons`) &&
                  !__block.code.includes(`next/image`) &&
                  !__block.code.includes(`next`) &&
                  !__block.code.includes(`@hookform/`),
              ),
            },
          };
        }),
    )
  ).filter((e) => e);
}

async function build() {
  console.dir({ "build/components": `react/shadcn` });
  const db = await build_from_docs_and_examples();
  fs.writeFileSync(
    `./library/components/react/shadcn/dump.json`,
    JSON.stringify(db),
  );
  console.dir({
    build: `./build/components/react/shadcn.js`,
    dump: `./library/components/react/shadcn/dump.json`,
  });
}
module.exports = { build };
