const path = require("path");

const ALLOWED_IMPORTS_GENERAL = [`axios`, `zod`];

async function run(req) {
  /*
    postprocess:
      - (i forgot what i meant to write here)
      - 'use client' check + append for react/next
      - svelte split at <script></script> to analyze both imports and html

      - extract all components used inside view (capital letters)
        * used components that arent imported but should be
        *
      - extract all used imports , compare with `import` in library/{framework}/{component_library}/metadata.json
        * hallucinated package imports
        * hallucinated local view/components imports (ie. import {Whatever} from "./Hallucination.tsx"; )
      - allowed global imports :
          * framework-specific (ie. react, react-dom, ...)
          * general allowed imports that are installed on staters (ie. axios, which is likely to be in gpt generated code)
      - check duplicate imports

      this stage is used to pass any errors to the next validation pass for a rewrite
  */

  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));
  console.log(
    "********** debug : pass/postprocess-generated-component ********************",
  );
  console.dir(req, { depth: null });
  process.exit();
  return {
    type: `component`,
    success: true,
    data: {},
  };
}

module.exports = {
  run,
};
