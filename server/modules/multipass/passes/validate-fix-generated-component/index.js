const path = require(`path`);
const validate_check = require(
  `../validate-check-generated-component/index.js`,
).validate;

const { OpenAI } = require("openai");
const tiktoken = require("@dqbd/tiktoken");
const tiktokenEncoder = tiktoken.get_encoding("cl100k_base");
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function _titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/*
  returns `component-validation-fix` type , which will be picked by post processing pass

  uses data from `validate-check-generated-component` pass
    if success:true in that pass, return `component-code` from the previous pass data.code
    if not, prompt llm to fix, then call `validate-check-generated-component` validate() method
      if rewritten component passes validation, return rewritten+validate code in `component-code`
      else, return success:false

*/

function error_badSyntax(query) {
  // query : { code , error_data : {error , code , code_with_line_numbers } }

  return (
    "## error type :\n" +
    query.error_data.error.toString() +
    "\n---\n" +
    "## error details :\n" +
    JSON.stringify(query.error_data.error, null, "\t") +
    "\n---\n" +
    "## part of the code where error was found :\n" +
    query.error_data.code_with_line_numbers
      .split(`\n`)
      .slice(
        Math.max(0, query.error_data.error.loc.line - 3),
        query.error_data.error.loc.line + 3,
      )
      .join(`\n`)
  );
}
function error_missingImports(query) {
  // query : { code , error_data : { imports_lists {components,icons,code} , component_imports[] , component_used_nodes[]  } }

  return (
    "## error type :\n" +
    `Missing Imports : Some external components were used inside this component, but were not imported\n` +
    "\n---\n" +
    "## error details :\n" +
    `List of components that were used without being imported :\n` +
    query.error_data.component_used_nodes
      .filter(
        (_used_node) =>
          !query.error_data.component_imports
            .map((e) => e.imported)
            .flat()
            .includes(_used_node),
      )
      .map((e) => `* ${e}`)
      .join(`\n`) +
    "\n---\n" +
    "## suggested fixes :\n" +
    `either remove the elements, or rewrite them using standard elements that do not need to be imported from an external package, while keeping a similar UI formatting`
  );
}
function error_illegalImports(query) {
  // query : { code , error_data : { imports_lists , allowed_imports_prefixes[] , component_imports_checks{Component:boolean} , component_imports  } }

  // console.dir({ error_illegalImports : query},{depth:null})

  const illegal_imports = query.error_data.component_imports.filter((c) =>
    Object.keys(query.error_data.component_imports_checks)
      .filter((k) => !query.error_data.component_imports_checks[k])
      .includes(c.from),
  );

  return (
    "## error type :\n" +
    `Illegal Imports : Some external components/packages were used in this component, but should not be, either because :\n` +
    `- they use an external package that is not allowed to be installed in this project\n` +
    `- they refer to a local component which does not exist\n` +
    "\n---\n" +
    "## error details :\n" +
    illegal_imports
      .map((e, idx) => {
        const suffix = e.imported.filter((e) => e != `default`).length
          ? `\n  * was used to import elements : ${e.imported
              .filter((e) => e != "default")
              .join(" , ")}`
          : "";
        return (
          `* non-allowed import (${idx + 1}/${illegal_imports.length}) : ${
            e.from
          }` + suffix
        );
      })
      .join(`\n\n`) +
    "\n---\n" +
    "## suggested fixes :\n" +
    `- remove all the non-allowed imports, as well as the elements that were imported from them and that were used inside the code\n` +
    `- rewrite the code without the non-allowed imported elements.\n` +
    `- when you fix the non allowed-imports, DO NOT USE ANY EXTERNAL IMPORTS OR PACKAGES - THE PROJECT DISABLES ANY COMPONENT INSTALL OUTSIDE OF WHAT IS PROVIDED AND IT WILL CRASH IT\n`
  );
}

const ERRORS_MAP = {
  "bad-syntax": error_badSyntax,
  "missing-imports": error_missingImports,
  "illegal-imports": error_illegalImports,
};

const FRAMEWORKS_EXTENSION_MAP = {
  react: `tsx`,
  next: `tsx`,
  svelte: `svelte`,
};

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  if (req.pipeline.stages[`component-validation-check`].success) {
    return {
      type: `component-validation-fix`,
      success: true,
      data: req.pipeline.stages[`component-validation-check`].data,
    };
  } else {
    // try to fix code by prompting

    const errors_context_entries = req.pipeline.stages[
      `component-validation-check`
    ].data.validation_errors.map((_validation_error, _error_idx) => {
      return {
        role: `user`,
        content:
          `# Component Error (${_error_idx + 1}/${
            req.pipeline.stages[`component-validation-check`].data
              .validation_errors.length
          })\n` +
          `---\n` +
          ERRORS_MAP[_validation_error.error]({
            error_data: _validation_error.data,
            code: req.pipeline.stages[`component-validation-check`].data.code,
          }),
      };
    });

    // req.pipeline.stages[`component-validation-check`].data.code

    /*
    console.dir({
      debug__validate_fix_generated_component : errors_context_entries
    },{depth:null})
    */

    const context = [
      {
        role: `system`,
        content:
          `You are an expert at writing ${_titleCase(
            req.query.framework,
          )} components and fixing ${_titleCase(
            req.query.framework,
          )} code with errors.\n` +
          `Your task is to fix the code of a ${_titleCase(
            req.query.framework,
          )} component for a web app, according to the provided detected component errors.\n` +
          `Also, the ${_titleCase(
            req.query.framework,
          )} component you write can make use of Tailwind classes for styling.\n` +
          `You will write the full ${_titleCase(
            req.query.framework,
          )} component code, which should include all imports.` +
          `The fixed code you generate will be directly written to a .${
            FRAMEWORKS_EXTENSION_MAP[req.query.framework]
          } ${_titleCase(
            req.query.framework,
          )} component file and used directly in production.`,
      },
      ...errors_context_entries,
      {
        role: `user`,
        content:
          `- Current ${_titleCase(
            req.query.framework,
          )} component code which has errors :\n\n` +
          "```" +
          FRAMEWORKS_EXTENSION_MAP[req.query.framework] +
          "\n" +
          req.pipeline.stages[`component-validation-check`].data.code +
          "\n```\n\n" +
          `Rewrite the full code to fix and update the provided ${_titleCase(
            req.query.framework,
          )} web component\n` +
          "The full code of the new " +
          _titleCase(req.query.framework) +
          " component that you write will be written directly to a ." +
          FRAMEWORKS_EXTENSION_MAP[req.query.framework] +
          " file inside the " +
          _titleCase(req.query.framework) +
          " project. Make sure all necessary imports are done, and that your full code is enclosed with ```" +
          FRAMEWORKS_EXTENSION_MAP[req.query.framework] +
          " blocks.\n" +
          "Answer with generated code only. DO NOT ADD ANY EXTRA TEXT DESCRIPTION OR COMMENTS BESIDES THE CODE. Your answer contains code only ! component code only !\n" +
          `Important :\n` +
          `- Make sure you import the components libraries and icons that are provided to you (if you use them) !\n` +
          `- Tailwind classes should be written directly in the elements class tags (or className in case of React). DO NOT WRITE ANY CSS OUTSIDE OF CLASSES\n` +
          `- Do not use libraries or imports except what is provided in this task; otherwise it would crash the component because not installed. Do not import extra libraries besides what is provided !\n` +
          `- Do not have ANY dynamic data! Components are meant to be working as is without supplying any variable to them when importing them ! Only write a component that render directly with placeholders as data, component not supplied with any dynamic data.\n` +
          `- Fix all errors according to the provided errors data\n` +
          `- You are allowed to remove any problematic part of the code and replace it\n` +
          `- Only write the code for the component; Do not write extra code to import it! The code will directly be stored in an individual ${_titleCase(
            req.query.framework,
          )} .${FRAMEWORKS_EXTENSION_MAP[req.query.framework]} file !\n\n` +
          `${
            req.query.framework != "svelte"
              ? "- Very important : Your component should be exported as default !\n"
              : ""
          }` +
          `Fix and write the updated version of the ${_titleCase(
            req.query.framework,
          )} component code as the creative genius and ${_titleCase(
            req.query.framework,
          )} component genius you are.\n`,
      },
    ];

    const gptPrompt = {
      model: process.env.OPENAI_MODEL,
      messages: context,
    };

    console.dir({
      context: context.map((e) => {
        return { role: e.role, content: e.content.slice(0, 200) + " ..." };
      }),
    });

    const context_prompt_tokens = tiktokenEncoder.encode(
      context.map((e) => e.content).join(""),
    ).length;
    console.log(
      `> total context prompt tokens (estimate) : ${context_prompt_tokens}`,
    );

    let completion = "";
    const stream = await openai.chat.completions.create({
      ...gptPrompt,
      stream: true,
    });
    for await (const part of stream) {
      process.stdout.write(part.choices[0]?.delta?.content || "");
      try {
        const chunk = part.choices[0]?.delta?.content || "";
        completion += chunk;
        req.stream.write(chunk);
      } catch (e) {
        false;
      }
    }

    req.stream.write(`\n`);

    let generated_code = ``;
    let start = false;
    for (let l of completion.split("\n")) {
      let skip = false;
      if (
        [
          "```",
          ...Object.values(FRAMEWORKS_EXTENSION_MAP).map((e) => "```" + e),
        ].includes(l.toLowerCase().trim())
      ) {
        start = !start;
        skip = true;
      }
      if (start && !skip) generated_code += `${l}\n`;
    }
    generated_code = generated_code.trim();

    const validate_new_code_response = await validate_check({
      framework: req.query.framework,
      components: req.query.components,
      icons: req.query.icons,
      code: generated_code,
    });

    console.dir(
      {
        debug__validate_fix__validate_new_code: {
          type: `component-validation-fix`,
          success: validate_new_code_response.success,
          data: validate_new_code_response.data,
        },
      },
      { depth: null },
    );

    return {
      type: `component-validation-fix`,
      success: validate_new_code_response.success,
      data: validate_new_code_response.data,
    };
  }

  return {
    type: `component-validation-fix`,
    success: false,
    data: {},
  };
}

module.exports = {
  run,
};
