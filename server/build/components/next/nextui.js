const fs = require(`fs`);
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function _extractImports(code) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: [
      "jsx",
      "tsx",
      "typescript",
      "react",
      //"@babel/plugin-proposal-class-properties",
      //"@babel/plugin-proposal-object-rest-spread"
    ],
    allowJSX: true,
    parser: "babel-eslint",
    extends: ["eslint:recommended", "plugin:react/recommended"],
    presets: ["@babel/env", "@babel/preset-react"],
  });

  const imports = {};

  traverse(ast, {
    ImportDeclaration(path) {
      const source = path.node.source.value;
      const specifiers = path.node.specifiers;

      if (!imports[source]) {
        imports[source] = [];
      }

      specifiers.forEach((specifier) => {
        if (specifier.type === "ImportSpecifier") {
          imports[source].push(specifier.imported.name);
        } else if (specifier.type === "ImportDefaultSpecifier") {
          imports[source].push("default");
        }
      });
    },
  });

  const importList = Object.entries(imports).map(([from, imported]) => ({
    from,
    imported,
  }));

  return importList;
}

function _extractExports(inputString) {
  // Regular expression to match text between curly brackets
  const regex = /{([^}]+)}/g;

  // Array to store the extracted texts
  const extractedTexts = [];

  let match;
  while ((match = regex.exec(inputString)) !== null) {
    // The matched text is in match[1]
    extractedTexts.push(match[1]);
  }

  return [
    ...new Set(
      extractedTexts
        .join(" ")
        .split(",")
        .map((e) => {
          return e.split(" ");
        })
        .flat()
        .map((e) => e.trim())
        .filter((e) => e.length)
        .filter((e) => e.charAt(0) === e.charAt(0).toUpperCase()),
    ),
  ];
}

function _replaceLastOccurrence(inputString, search, replacement) {
  const lastIndex = inputString.lastIndexOf(search);

  if (lastIndex === -1) {
    // If the search substring is not found, return the original string
    return inputString;
  }

  const beforeLastOccurrence = inputString.substring(0, lastIndex);
  const afterLastOccurrence = inputString.substring(lastIndex + search.length);

  const replacedString =
    beforeLastOccurrence + replacement + afterLastOccurrence;

  return replacedString;
}

async function pre_build() {
  console.dir({ "build/components": `next/nextui` });
  const docs_files = fs
    .readdirSync(
      `./build/gits/nextui-org$nextui/apps/docs/content/docs/components`,
    )
    .map(
      (f) =>
        `./build/gits/nextui-org$nextui/apps/docs/content/docs/components/${f}`,
    );

  return docs_files /*.filter(e=>e.includes(`navbar`))*/
    .map((doc_file) => {
      const content = fs.readFileSync(doc_file, "utf-8");
      const [name, description] = content
        .split("---")[1]
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length)
        .map((e) => {
          return e.split(`"`).slice(1, -1);
        })
        .flat();

      const use = [
        {
          source: `usage.tsx`,
          code: eval(
            _replaceLastOccurrence(
              fs.readFileSync(
                `./build/gits/nextui-org$nextui/apps/docs/content/components/` +
                  doc_file.split("/").slice(-1)[0].split(`.mdx`)[0] +
                  `/usage.ts`,
                "utf-8",
              ),
              `export default`,
              `module.exports =`,
            ),
          )
            [`/App.jsx`].split(`\n`)
            .filter((l) => !(l.includes(`import`) && l.includes(`./`))) // ghost local imports
            .join(`\n`),
        },
      ];

      const examples = fs
        .readdirSync(
          `./build/gits/nextui-org$nextui/apps/docs/content/components/` +
            doc_file.split("/").slice(-1)[0].split(`.mdx`)[0],
        )
        .filter((f) => ![`index.ts`, `usage.ts`].includes(f))
        .map((f) => {
          return (
            `./build/gits/nextui-org$nextui/apps/docs/content/components/` +
            doc_file.split("/").slice(-1)[0].split(`.mdx`)[0] +
            `/${f}`
          );
        })
        .map((f) => {
          return {
            source: f.split("/").slice(-1)[0].split(`.`)[0] + `.tsx`,
            code: eval(
              _replaceLastOccurrence(
                fs.readFileSync(f, "utf-8"),
                `export default`,
                `module.exports =`,
              ).replaceAll(`export const`, `const`), // <--- because badge/content-examples.ts messes up build
            )
              [`/App.jsx`].split(`\n`)
              .filter((l) => !(l.includes(`import`) && l.includes(`./`))) // ghost local imports
              .join(`\n`),
          };
        });

      const docs = {
        import: {
          source: doc_file.split("/").slice(-1)[0],
          code: content
            .split(`## Import`)[1]
            .split(`## Usage`)[0]
            .trim()
            .split(`commands={{`)[1]
            .split(`individual`)[0]
            .split(`main:`)[1]
            .trim()
            .slice(1, -2)
            .trim()
            .split(/\s+/)
            .join(" "),
        },
        use: use
          .filter((e) => e)
          .filter((e) => e.code.includes(`export default function App`))
          .filter((e) => !e.source.includes(`custom`)),
        examples: examples
          .filter((e) => e)
          .filter((e) => e.code.includes(`export default function App`))
          .filter((e) => !e.source.includes(`custom`)),
      };
      return {
        name,
        description: description,
        docs_path: doc_file,
        docs,
      };
    });
}

async function build() {
  const pre_db = await pre_build();
  let IMPORT_MAP = {
    useDisclosure: "@nextui-org/react",
    cn: "@nextui-org/react",
    getKeyValue: "@nextui-org/react",
  };
  fs.readdirSync(`./build/gits/nextui-org$nextui/packages/components/`).map(
    (component_dir) => {
      const exportString = fs
        .readFileSync(
          `./build/gits/nextui-org$nextui/packages/components/${component_dir}/src/index.ts`,
          `utf-8`,
        )
        .split(`// export`)
        .slice(1)
        .join(`// export`)
        .trim();
      _extractExports(exportString).map((_export) => {
        IMPORT_MAP[_export] = `@nextui-org/${component_dir}`;
      });
      // console.dir({component_dir,exportString,exportedModules})
    },
  );

  function _adaptImports(code) {
    let libraries_to_import = {};
    const uniqueImports = [
      ...new Set(
        _extractImports(code)
          .map((block) => block.imported)
          .flat(),
      ),
    ];
    uniqueImports.map((imp) => {
      if (!Object.keys(libraries_to_import).includes(IMPORT_MAP[imp]))
        libraries_to_import[IMPORT_MAP[imp]] = [imp];
      else libraries_to_import[IMPORT_MAP[imp]].push(imp);
    });
    return (
      `'use client';\n\n` +
      Object.keys(libraries_to_import)
        .map((key) => {
          return `import { ${libraries_to_import[key].join(
            ", ",
          )} } from "${key}";`;
        })
        .join(`\n`)
    );
  }

  function _adaptBlockCode(code, trace) {
    const _import_block = code.split(`export default`)[0].trim();
    const import_block_head = _adaptImports(_import_block);

    if (import_block_head.includes(`from "undefined"`)) {
      console.dir({
        skip: trace,
        //code,
        reason:
          `component examples with import such as ` +
          `"next/image" , "swr" , "@react-stately/data" , "@nextui-org/use-infinite-scroll" ... will be problematic, skipping`,
      });
      return false;
    }

    const import_block_body = _import_block
      .split(`\n`)
      .filter((line) => {
        !line.includes(`@nextui-org`) &&
          !Object.keys(IMPORT_MAP)
            .map((key) => line.includes(key))
            .filter((e) => e).length;
      })
      .join(`\n`)
      .trim();

    return `${import_block_head}\n${import_block_body}\nexport default${
      code.split("export default")[1]
    }`;
    //return {import_block_head , import_block_body , _import_block}
  }

  const db = pre_db.map((component) => {
    return {
      ...component,
      docs: {
        import: {
          source: component.docs.import.source,
          code: _adaptImports(component.docs.import.code),
        },
        use: component.docs.use
          .map((block) => {
            return {
              source: block.source,
              code: _adaptBlockCode(
                block.code,
                `${component.name} -> ${block.source}`,
              ),
            };
          })
          .filter((block) => block.code),
        examples: component.docs.examples
          .map((block) => {
            return {
              source: block.source,
              code: _adaptBlockCode(
                block.code,
                `${component.name} -> ${block.source}`,
              ),
            };
          })
          .filter((block) => block.code),
      },
    };
  });

  /*
    for each of use+examples ******--------*******-------------
      split before 'export default'
      run _adaptImports for imports
      split on \n, filter out any line that has @next or a component Name
        in case stuff like useState (verify by running dump.json in babel in _test.js next)
      prefix inject _adaptImports return and dont forget 'use client'
  */

  fs.writeFileSync(
    `./library/components/next/nextui/dump.json`,
    JSON.stringify(db),
  );
  console.dir({
    build: `./build/components/next/nextui.js`,
    dump: `./library/components/next/nextui/dump.json`,
  });
}

module.exports = { build };
