const path = require("path");
const fs = require(`fs`);
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const { fixImport } = require(`import-fixer`);

/*
  !
    important : will skip most validation for svelte ; need to figure out how to use it with babel ...
  !
*/

/*
  validation pass:
    1. tries to fix errors like duplicate errors on its own
    2. if conflict, returns {status:false , data: {...} }
    3. the next pass, `validate-fix-generated-component` prompts llm to try fix problem
*/

/*
  validation steps ; each defined in a module within the same folder as this:
  x.  pre validation processing : ie. svelte needs to split at <script></script> ; add checkpoint ; replace it further down
  x.  duplicate/unused imports (via `import-fixer` for now) ; necessary to run first because otherwise babel ast fails
  x.  "use client" check
  x.  if svelte , put back the <script></script> at checkpoint from first step, and skip the rest of validation
  x.  extract all used library elements (ie. Button from nextui ; SomeIcon from svelte);
        babel ast then check for nodes names
      check if all used imported; check against library/componnents/{framework}/{component_library}/dump.json all_imports_map
      fix mismatches
  x.  extract all imports from component
        ie. hallucinated package imports / local component paths that might be in docs but would break app
        checks can either use startsWith or use === ; determine what when later
        compare with allowed imports
          imports specific to components library :
            in `import` key in library/components/{framework}/{component_library}/metadata.json
          imports specific to icons :
            `import` key in library/icons/{icons_library}/lucide/metadata/json
          imports specific to framework :
            in each validation module (they are in this same folder)
          global allowed imports :
            ALLOWED_IMPORTS_GENERAL above
          (later) :
            maybe with listdir on ${WEBAPP_ROOT}/node_modules too

  o.  import-fixer removes all unused imports, including React etc. might double check to put them back in case

  o. prettify component code?

  >  if any conflicts (ie. hallucinated imports);
      prompt LLM to fix in next pass `validate-fix-generated-component`
      number of fix retries determined in .env
*/

const ALLOWED_IMPORTS_GENERAL = [`axios`, `zod`, `date-fns`];
const ALLOWED_IMPORTS_FRAMEWORK = {
  next: [`react`, `next`, `formik`, `yup `],
  react: [`react`, `formik`, `yup `],
  svelte: [`svelte`],
};
const REQUIRES_USE_CLIENT_PREFIX = [`next`, `react`];

function _babel_imports_map(code) {
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
    parser: "@babel/eslint-parser",
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

function _babel_extract_nodes(code) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "tsx", "typescript", "react"],
    allowJSX: true,
    parser: "@babel/eslint-parser",
    extends: ["eslint:recommended", "plugin:react/recommended"],
    presets: ["@babel/env", "@babel/preset-react"],
  });

  const jsxElements = [];

  traverse(ast, {
    JSXOpeningElement(path) {
      const elementName = path.node.name.name;
      jsxElements.push(elementName);
    },
  });

  return jsxElements.filter((e) => e[0].toUpperCase() === e[0]);
}

function _imports_list_from_code(framework, _code) {
  let _imports = [];
  let code = `${_code}`;
  if (framework === `svelte`) {
    code = code.split("</script")[0].trim().split("\n").slice(1).join("\n"); // svelte, imports
  }
  try {
    return _babel_imports_map(code)
      .map((e) => e.from)
      .flat();
  } catch (e) {
    /*
    console.dir(
      {
        validate_check____imports_list_from_code: {
          code: code.split(`\n`).map((l, idx) => `${idx} > ${l}`).join(`\n`),
          e,
        },
      },
      { depth: null },
    );
    */

    return {
      error: e,
      code,
      code_with_line_numbers: code
        .split(`\n`)
        .map((l, idx) => `${idx} > ${l}`)
        .join(`\n`),
    };
  }
  return false;
}
function _make_imports_list_from_components_library(framework, components) {
  let _imports_list = [];
  JSON.parse(
    fs.readFileSync(
      `./library/components/${framework}/${components}/dump.json`,
      `utf-8`,
    ),
  ).map((c) => {
    [
      c.docs.import.code,
      c.docs.use.map((_c) => _c.code),
      c.docs.examples.map((_c) => _c.code),
    ]
      .flat()
      .map((code) => {
        _imports_list.push(_imports_list_from_code(framework, code));
      })
      .filter((e) => e);
  });
  return [...new Set(_imports_list.flat())].sort();
}

async function validate(query) {
  // query : { framework, components, icons, code }

  let found_errors_stack = [];

  // pre validation processing : ie. svelte needs to split at <script></script> ; add checkpoint ; replace it further down
  const __component_code_pre =
    query.framework != `svelte`
      ? query.code
      : !query.code.includes(`<script`)
      ? query.code
      : query.code
          .split(`</script>`)
          .filter((l) => l.trim().length)
          .map((block, idx) => {
            if (!idx) {
              // header; script block
              return block
                .split(`\n`)
                .filter((l) => !l.startsWith(`<script`))
                .map((l) => {
                  if (l.includes(`import`)) return l.trim();
                  return l;
                })
                .join(`\n`);
            } else {
              // body, html block
              // mimick react component style
              return (
                `export default function App() {\n\n return (\n  <>\n` +
                block
                  .split(`\n`)
                  .map((l) => `   ${l}`)
                  .join(`\n`) +
                `\n  </>\n )\n}`
              );
            }
          })
          .join(`\n`);

  // duplicate/unused imports (via `import-fixer` for now) ; necessary to run first because otherwise babel ast fails
  // if no imports used, `import-fixer` returns error:true, in which case skip imports validation
  const __temp_file = `./__import_fixer_temp_${Math.floor(
    Math.random() * (99999 - 10000) + 10000,
  )}`;
  let __component_code = `${__component_code_pre}`;

  const __import_fixer_response = fixImport(
    __temp_file,
    __component_code_pre.replaceAll(`$`, `______________`), // <--- `import-fixer` ignores the `$` char, dirty fix but works for now
  );

  if (__import_fixer_response.error) {
    console.dir({ skip: __import_fixer_response });
    // decide what to do here ; skip or further validation
  } else {
    // "use client" check
    __component_code = __import_fixer_response.output;

    if (REQUIRES_USE_CLIENT_PREFIX.includes(query.framework)) {
      if (
        !__import_fixer_response.output.includes(`'use client'`) &&
        !__import_fixer_response.output.includes(`"use client"`)
      ) {
        __component_code =
          `"use client";\n\n` +
          __import_fixer_response.output
            .split(`\n`)
            .filter(
              (e) => !e.includes(`"use client"`) && !e.includes(`'use client'`),
            )
            .join(`\n`);
      }
    }

    __component_code = __component_code.replaceAll(`______________`, `$`);
  }
  try {
    fs.unlinkSync(__temp_file);
  } catch (e) {
    true;
  }

  if (query.framework === `svelte`) {
    // no further validation for svelte for now;
    // replace the svelte structure from react pseudoconversion checkpoint and skip next validation steps

    console.dir({
      validation_skip: `svelte validation not fully implemented`,
    });

    // console.dir({__component_code_before_resvelting : __component_code},{depth:null})

    let __component_code_split = __component_code.split(
      `export default function App() {\n\n return (\n  <>\n`,
    );
    if (__component_code_split.length <= 1) {
      __component_code_split = [``, ...__component_code_split];
    }

    __component_code = __component_code_split
      .map((block, idx) => {
        // console.dir({_____block : block , idx})
        return !idx
          ? `<script>\n${block}\n</script>`
          : block.split(`\n  </>\n )\n}`)[0];
      })
      .join(`\n`);

    // console.dir({__component_code_split , __component_code})
    __component_code = __component_code
      .split(`\n  </>\n )\n}`)[0]
      .split(`\n`)
      .filter((l) => l.trim().length)
      .join(`\n`);

    // console.dir({__component_code_after_resvelting : __component_code},{depth:null}) ; process.exit()

    console.dir({
      "validate-check-generated-component": {
        success: !found_errors_stack.length ? true : false,
      },
    });

    return {
      type: `component-validation-check`,
      success: !found_errors_stack.length ? true : false,
      data: {
        validation_errors: found_errors_stack,
        code: __component_code,
      },
    };
  }

  /*
              check if all used html nodes are imported;
          */

  const _code_imports = _imports_list_from_code(
    query.framework,
    __component_code,
  );

  if (_code_imports.error) {
    // if babel AST fails, cannot proceed with further validation
    // console.dir({ bad_syntax_error: _code_imports });

    found_errors_stack.push({
      error: `bad-syntax`,
      data: {
        ..._code_imports,
      },
    });

    console.dir({
      "validate-check-generated-component": {
        success: !found_errors_stack.length ? true : false,
      },
    });

    return {
      type: `component-validation-check`,
      success: !found_errors_stack.length ? true : false,
      data: {
        validation_errors: found_errors_stack,
        code: __component_code,
      },
    };
  }

  const imports_lists = {
    //components : _make_imports_list_from_components_library(req.query.framework , req.query.components),
    components: JSON.parse(
      fs.readFileSync(
        `./library/components/${query.framework}/${query.components}/metadata.json`,
        `utf-8`,
      ),
    ).import,
    icons: [
      JSON.parse(
        fs.readFileSync(
          `./library/icons/${query.icons}/metadata.json`,
          `utf-8`,
        ),
      ).import[query.framework],
    ],
    code: _code_imports,
  };

  let component_imported_nodes_map = {};
  const component_imports = _babel_imports_map(__component_code).map((e) => {
    e.imported.map((_node) => {
      // might override duplicates; which would be a problem to begin with
      // todo later : check duplicate names
      component_imported_nodes_map[_node] = e.from;
    });
    return e;
  });
  const component_used_nodes = _babel_extract_nodes(__component_code);

  let all_used_nodes_are_imported = true;
  component_used_nodes.map((_c) => {
    if (!Object.keys(component_imported_nodes_map).includes(_c))
      all_used_nodes_are_imported = false;
  });

  if (!all_used_nodes_are_imported) {
    found_errors_stack.push({
      error: `missing-imports`,
      data: {
        imports_lists,
        component_imports,
        component_used_nodes,
      },
    });
  }

  /*
    console.dir(
      {
        debug_used_nodes_check: {
          imports_lists,
          component_imports,
          component_imported_nodes_map,
          component_used_nodes,
          all_used_nodes_are_imported,
        },
      },
      { depth: null },
    );
  */

  /*
    check if any hallucinated/non-allowed imports
  */

  const allowed_imports_prefixes = [
    ...new Set([
      ...imports_lists.components,
      ...imports_lists.icons,
      ...ALLOWED_IMPORTS_GENERAL,
      ...ALLOWED_IMPORTS_FRAMEWORK[query.framework],
    ]),
  ];

  let component_imports_checks = {};
  imports_lists.code.map((_component_import) => {
    component_imports_checks[_component_import] = false;
    allowed_imports_prefixes.map((_allowed_import_prefix) => {
      if (_component_import.startsWith(_allowed_import_prefix)) {
        component_imports_checks[_component_import] = true;
      }
    });
  });
  const all_component_imports_are_allowed = Object.values(
    component_imports_checks,
  ).filter((e) => !e).length
    ? false
    : true;

  /*
    console.dir(
      {
        debug_imports_check: {
          allowed_imports_prefixes,
          component_imports_checks,
          all_component_imports_are_allowed,
        },
      },
      { depth: null },
    );
  */

  if (!all_component_imports_are_allowed) {
    found_errors_stack.push({
      error: `illegal-imports`,
      data: {
        imports_lists,
        allowed_imports_prefixes,
        component_imports_checks,
        component_imports,
      },
    });
  }

  console.dir({
    "validate-check-generated-component": {
      success: !found_errors_stack.length ? true : false,
    },
  });

  return {
    type: `component-validation-check`,
    success: !found_errors_stack.length ? true : false,
    data: {
      validation_errors: found_errors_stack,
      code: __component_code,
    },
  };
}

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));
  return await validate({
    framework: req.query.framework,
    components: req.query.components,
    icons: req.query.icons,
    code: req.pipeline.stages["component-code"].data,
  });
}

module.exports = {
  run,
  validate, // <---- is used to validate code fix attempts in `validate-fix-generated-component` pass
};
