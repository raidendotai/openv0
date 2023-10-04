/* builds json dump for react/shadcn , using ../../gits/shadcn-ui */
const fs = require(`fs`);
const markdownIt = require("markdown-it")();

function extractCodeBlocks(markdownContent, lang) {
  const tokens = markdownIt.parse(markdownContent, {});

  let tsxCodeBlocks = [];
  let currentCodeBlock = "";

  for (const token of tokens) {
    if (token.type === "fence" && token.info === lang) {
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

/*
  meta : ./build/gits/huntabyte$shadcn-svelte/apps/www/src/content/components
  demos : ./build/gits/huntabyte$shadcn-svelte/apps/www/src/lib/registry/default/example
*/
async function build() {
  console.dir({ "build/components": `svelte/shadcn` });

  const examples_files = fs
    .readdirSync(
      `./build/gits/huntabyte$shadcn-svelte/apps/www/src/lib/registry/default/example`,
    )
    .filter((e) => e.includes(`.svelte`));

  const db = fs
    .readdirSync(
      `./build/gits/huntabyte$shadcn-svelte/apps/www/src/content/components`,
    )
    //.filter(e=>e.includes(`button`))
    .map((doc_file) => {
      try {
        const slug = doc_file.split(".")[0];

        const index = fs.readFileSync(
          `./build/gits/huntabyte$shadcn-svelte/apps/www/src/content/components/${doc_file}`,
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
            if (split[0] === `title`) meta.title = split[1];
            else if (split[0] === `description`)
              meta.description = split[1].slice(0, -1);
            else if (split[0] === `component`)
              meta.component = split[1] === "true" ? true : false;
          });
        if (!meta.component) return false;

        const _import = index.split(`## Usage`)[1].split(`##`)[0].trim();
        // ^ --------- import/usage not consistent in docs (compare alert-dialog with imports)
        const svelteBlocks = extractCodeBlocks(index, `svelte`);

        const examples = examples_files
          .filter((f) => f.startsWith(slug))
          .map((f) => {
            //console.dir({slug,f})
            return {
              source: f,
              code: fs
                .readFileSync(
                  `./build/gits/huntabyte$shadcn-svelte/apps/www/src/lib/registry/default/example/${f}`,
                  "utf-8",
                )
                .trim()
                .replaceAll(`"@/registry/default/ui/`, `"$lib/components/ui/`),
            };
          });

        return {
          name: meta.title,
          description: meta.description,
          docs_path: `./build/gits/huntabyte$shadcn-svelte/apps/www/src/content/components/${doc_file}`,
          docs: {
            import: {
              source: `${doc_file.split(`.`)[0]}.svelte`,
              code: svelteBlocks[0].split(`</script>`)[0] + `</script>`,
            },
            use:
              svelteBlocks.length > 1
                ? svelteBlocks.slice(1).map((block) => {
                    return {
                      source: `${doc_file.split(`.`)[0]}.svelte`,
                      code: block,
                    };
                  })
                : [
                    {
                      source: `${doc_file.split(`.`)[0]}.svelte`,
                      code: svelteBlocks[0],
                    },
                  ],
            examples,
          },
        };
      } catch (e) {
        console.dir({
          skip: `./build/gits/huntabyte$shadcn-svelte/apps/www/src/content/components/${doc_file}`,
        });
        return false;
      }
    })
    .filter((e) => e);

  fs.writeFileSync(
    `./library/components/svelte/shadcn/dump.json`,
    JSON.stringify(db),
  );
  console.dir({
    build: `./build/components/svelte/shadcn.js`,
    dump: `./library/components/svelte/shadcn/dump.json`,
  });
}
module.exports = { build };
