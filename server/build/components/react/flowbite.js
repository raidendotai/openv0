const fs = require(`fs`);
const path = require("path");
const markdownIt = require("markdown-it")();
//const cheerio = require('cheerio');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function _titleCase(str) {
  return str.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
}
function _camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

function extractJsxCodeBlocks(markdownContent) {
  const tokens = markdownIt.parse(markdownContent, {});

  let tsxCodeBlocks = [];
  let currentCodeBlock = "";

  for (const token of tokens) {
    if (token.type === "fence" && token.info === "jsx") {
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
  console.dir({ "build/components": `react/flowbite` });
  const db = fs
    .readdirSync(`./build/gits/themesberg$flowbite-react/app/docs/components`)
    .filter((component_dir) => !component_dir.includes(`.`))
    //.slice(0,10)
    //.filter(component_dir => component_dir.includes('modal'))
    .map((component_dir) => {
      const meta = fs.readFileSync(
        `./build/gits/themesberg$flowbite-react/app/docs/components/${component_dir}/${component_dir}.mdx`,
        `utf-8`,
      );
      const index = fs.readFileSync(
        `./build/gits/themesberg$flowbite-react/app/docs/components/${component_dir}/index.tsx`,
        `utf-8`,
      );
      const page = fs.readFileSync(
        `./build/gits/themesberg$flowbite-react/app/docs/components/${component_dir}/page.tsx`,
        `utf-8`,
      );

      const codeBlocks = meta
        .split(`## Table of Contents`)[1]
        .split(`## Theme`)[0]
        .trim()
        .split(`##`)
        .slice(1)
        .map((block) => {
          const blockSlug =
            block
              .trim()
              .split(`\n`)[0]
              .trim()
              .toLowerCase()
              .replaceAll(` `, `-`)
              .replace(/[^a-zA-Z0-9-]/g, "") + `.tsx`;
          const blockCodePreview =
            `<CodePreview` +
            block.trim().split(`<CodePreview`)[1].split(`</CodePreview>`)[0] +
            `</CodePreview>`;
          //-------------------------------------------------

          let [
            __code,
            __functionBody,
            __title,
            __importExternal,
            __importFlowbiteReact,
            __className,
          ] = [...Array(6).keys()].map((e) => false);

          if (blockCodePreview.includes("code={`")) {
            __code = blockCodePreview.split("code={`")[1].split("`}")[0];
          }
          if (blockCodePreview.includes("functionBody={[")) {
            __functionBody = eval(
              `[` +
                blockCodePreview.split("functionBody={[")[1].split("]}")[0] +
                `]`,
            )
              .map((l) => ` ${l}`)
              .join(`\n`);
          }
          if (blockCodePreview.includes("title=")) {
            __title = blockCodePreview.split('title="')[1].split('"')[0];
          }
          if (blockCodePreview.includes("importExternal=")) {
            __importExternal = blockCodePreview
              .split('importExternal="')[1]
              .split('"')[0];
          }
          if (blockCodePreview.includes("importFlowbiteReact=")) {
            __importFlowbiteReact = blockCodePreview
              .split('importFlowbiteReact="')[1]
              .split('"')[0];
          }

          let __codeContent;
          if (!(__code || __functionBody)) {
            // const $ = cheerio.load(blockCodePreview, { xmlMode: true , decodeEntities: false })
            // __codeContent = $('CodePreview').html()
            // __className = $('CodePreview').attr('className');
            const ast = parser.parse(blockCodePreview, {
              sourceType: "module",
              plugins: ["jsx"],
            });

            traverse(ast, {
              JSXElement(path) {
                if (path.node.openingElement.name.name === "CodePreview") {
                  const start = path.node.openingElement.end;
                  const end = path.node.closingElement.start;
                  __codeContent = blockCodePreview.slice(start, end);
                }
              },
            });
          } else {
            let _blockCodePreview = `${blockCodePreview}`;
            if (__code) {
              const problematic_code = "code={`" + __code + "`}";
              _blockCodePreview = _blockCodePreview.replace(
                problematic_code,
                "",
              );
            }
            if (__functionBody) {
              const problematic_functionBody =
                "functionBody={[" +
                blockCodePreview.split("functionBody={[")[1].split("]}")[0] +
                "]}";
              _blockCodePreview = _blockCodePreview.replace(
                problematic_functionBody,
                "",
              );
            }
            // const $ = cheerio.load(_blockCodePreview, { xmlMode: true , decodeEntities: false })
            // __codeContent = $('CodePreview').html()
            // __className = $('CodePreview').attr('className');
            const ast = parser.parse(blockCodePreview, {
              sourceType: "module",
              plugins: ["jsx"],
            });
            traverse(ast, {
              JSXElement(path) {
                if (path.node.openingElement.name.name === "CodePreview") {
                  const start = path.node.openingElement.end;
                  const end = path.node.closingElement.start;
                  __codeContent = blockCodePreview.slice(start, end);
                }
              },
            });
          }

          //----------------------------------------
          /*
        if (__codeContent) return false
        return {
          source: blockSlug,
          debug: {
            __code, __functionBody, __title, __importExternal, __importFlowbiteReact, __className,
            __codeContent: __codeContent ? __codeContent.slice(0,200) : false,
          }
        }
        */

          let componentCode = ``;

          // 0. component imports *************
          //  either normal import from top block
          //  or codePreviewImportFlowbiteReact ; check if no conflicts with normal import ?
          if (__importFlowbiteReact) {
            componentCode +=
              `'use client';\n\n` +
              `import { ${__importFlowbiteReact} } from 'flowbite-react';`;
          } else {
            // import from example block
            componentCode += extractJsxCodeBlocks(meta)[0].trim();
          }
          // 1. external imports *************
          if (__importExternal) {
            componentCode += `\n${__importExternal}`;
          }
          componentCode += `\n\n`;

          // wrap with export default fuction CamelName() { return (<html>) }
          const componentName =
            _titleCase(_camelCase(__title)).replace(/[^a-zA-Z0-9]/g, "") +
            "Component";

          const __functionInject = __functionBody ? __functionBody + `\n` : "";

          // react <> </> thing (if i understood right lol)

          const __mainCode = __code
            ? __code
                .split(`\n`)
                .map((l) => `   ${l}`)
                .join(`\n`)
            : __codeContent;

          /*
        // overkill <--------
        const __wrappedCode = __className && __className.length
                                ? `\n   <div className=${__className}>\n`
                                  + __mainCode.split(`\n`).map(l=>`  ${l}`).join(`\n`)
                                  + `\n   </div>\n`
                                : __mainCode
        */

          const __wrappedCode = __mainCode;
          const __codeInject =
            /*/__code ? */ `\n  <>\n` + __wrappedCode + `\n  </>\n`;
          /* : __wrappedCode */

          componentCode +=
            `export default function ${componentName}() {\n` +
            __functionInject +
            ` return (` +
            __codeInject +
            ` )\n}`;

          /*

        // -------- legacy, cheerio fails to parse because of multiline attributes and react syntax, had to go manual

        const codePreviewTitle = $('CodePreview').attr('title');

        const codePreviewImportExternal = $('CodePreview').attr('importExternal');
        const codePreviewImportFlowbiteReact = $('CodePreview').attr('importFlowbiteReact');
        const codePreviewClassName = $('CodePreview').attr('className');

        // add imports and wrap component ----------

        let componentCode = ``

        // add
        //  either normal import from top block
        //  or codePreviewImportFlowbiteReact ; check if no conflicts with normal import ?
        if (codePreviewImportFlowbiteReact) {
          // construct imports
          codePreviewImportFlowbiteReact.split(`,`).map(c=>c.trim()).filter(c=>c.length)
          componentCode += `'use client';\n\n`
                           + `import { ${codePreviewImportFlowbiteReact} } from 'flowbite-react';`
        } else {
          // import from example block
          componentCode += extractJsxCodeBlocks(meta)[0].trim()
        }
        // add external imports (or ignore them if problematic later ?)
        if (codePreviewImportExternal) {
          componentCode += `\n${codePreviewImportExternal}`
        }
        componentCode += `\n\n`

        console.log( component_dir, ' | ' , codePreviewTitle)
        // wrap with export default fuction CamelName() { return (<html>) }
        const componentName = _titleCase(_camelCase(codePreviewTitle))
        componentCode += `export default function ${componentName}() {\n`
                          + ` return (`
                          + codePreviewContent//.split(`\n`).map(l=>`\r\r${l}`).join(`\n`)
                          + ` )\n}`
        */

          return {
            source: blockSlug,
            code: componentCode,
            // {
            //componentCode
            // componentName,
            // codePreviewImportExternal,
            // codePreviewClassName,
            // codePreviewContent: codePreviewContent.slice(0,20),
            // }
          };
        })
        .filter((block) => block);

      // console.dir({meta,index,page},{depth:null})
      return {
        name: _titleCase(component_dir),
        description: page
          .split(`description:`)[1]
          .split(`title:`)[0]
          .trim()
          .slice(1, -2),
        docs_path: `./build/gits/themesberg$flowbite-react/app/docs/components/${component_dir}/${component_dir}.mdx`,
        docs: {
          import: {
            source: `${component_dir}.mdx`,
            code: extractJsxCodeBlocks(meta)[0],
          },
          use: [codeBlocks[0]].filter(
            (__block) =>
              !__block.code.includes(`next/image`) &&
              !__block.code.includes(`next`),
          ),
          examples: codeBlocks
            .slice(1)
            .filter(
              (__block) =>
                !__block.code.includes(`next/image`) &&
                !__block.code.includes(`next`),
            ),
        },
      };
    });

  // console.dir(db,{depth:null})

  fs.writeFileSync(
    `./library/components/react/flowbite/dump.json`,
    JSON.stringify(db),
  );
  console.dir({
    build: `./build/components/react/flowbite.js`,
    dump: `./library/components/react/flowbite/dump.json`,
  });
}
module.exports = { build };
