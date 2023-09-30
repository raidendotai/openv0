const tiktoken = require("@dqbd/tiktoken");
const tiktokenEncoder = tiktoken.get_encoding("cl100k_base");
const path = require("path");

require("dotenv").config();

const RAG = {
  icons: require(`./rag_icons.js`),
  components: require(`./rag_components.js`),
};

const FRAMEWORKS_EXTENSION_MAP = {
  react: `tsx`,
  next: `tsx`,
  svelte: `svelte`,
};

function _titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  const design_task = {
    components: req.pipeline.stages[`component-design-task`].data.components
      ? req.pipeline.stages[`component-design-task`].data.components
      : [],
    icons: req.pipeline.stages[`component-design-task`].data.icons
      ? req.pipeline.stages[`component-design-task`].data.icons
      : [],
  };

  let retrieved = {
    icons: await RAG.icons.run({
      icons: design_task.icons,
      framework: req.query.framework,
      library: req.query.icons,
    }),
    components: await RAG.components.run({
      components: design_task.components.map((e) => e.name),
      framework: req.query.framework,
      library: req.query.components,
    }),
  };

  // for now, picking random components from examples
  // until reaching token limit from process.env.PASS__CONTEXT__COMPONENTS_LIBRARY_EXAMPLES__TOKEN_LIMIT
  // later : more elaborate with vectordb (need to make embeddings for components libraries)

  retrieved.components = retrieved.components.map((library_component, idx) => {
    let _library_component_examples = [...library_component.docs.examples];
    const _tokens_limit = parseInt(
      process.env.PASS__CONTEXT__COMPONENTS_LIBRARY_EXAMPLES__TOKEN_LIMIT,
    );
    let _consumed_tokens = 0;
    let _examples = [];

    while (
      _consumed_tokens < _tokens_limit &&
      _library_component_examples.length
    ) {
      const random_component_example = _library_component_examples.splice(
        Math.floor(Math.random() * _library_component_examples.length),
        1,
      )[0];

      _consumed_tokens += tiktokenEncoder.encode(
        random_component_example.code,
      ).length;

      if (_consumed_tokens < _tokens_limit)
        _examples.push(random_component_example);
    }

    console.log(
      `tokens for context entry ${library_component.name} : ${_consumed_tokens} ` +
        `(limit : ${process.env.PASS__CONTEXT__COMPONENTS_LIBRARY_EXAMPLES__TOKEN_LIMIT})`,
    );

    let updated_library_component = { ...library_component };
    updated_library_component.docs.examples = _examples;
    return updated_library_component;
  });

  const component_ext = FRAMEWORKS_EXTENSION_MAP[req.query.framework];

  const component_context = [
    ...retrieved.components.map((e, idx) => {
      const examples_block = !e.docs.examples.length
        ? ""
        : "\n\n" +
          `# full code examples of ${_titleCase(
            req.query.framework,
          )} components that use ${e.name} :\n` +
          e.docs.examples
            .map((example) => {
              return (
                "```" + example.source + "\n" + example.code.trim() + "\n```"
              );
            })
            .join(`\n\n`);
      return {
        role: `user`,
        content:
          `Library components can be used while making the new ${_titleCase(
            req.query.framework,
          )} component\n\n` +
          `Suggested library component (${idx + 1}/${
            retrieved.components.length
          }) : ${e.name} - ${e.description}\n` +
          `Suggested usage : ${design_task.components[idx].usage}\n\n\n` +
          `# ${e.name} can be imported into the new component like this:\n` +
          "```" +
          component_ext +
          "\n" +
          e.docs.import.code.trim() +
          "\n```\n\n---\n\n" +
          `# examples of how ${e.name} can be used inside the new component:\n` +
          e.docs.use
            .map((block) => {
              return "```" + component_ext + "\n" + block.code.trim() + "\n```";
            })
            .join(`\n\n`) +
          "\n\n---" +
          examples_block,
      };
    }),

    ...[
      retrieved.icons.icons.length
        ? {
            role: `user`,
            content:
              `Icon elements can optionally be used when making the React component.\n\n` +
              `---\n\n# example: importing icons in the component (only import the ones you need) :\n\n` +
              "```" +
              component_ext +
              "\n" +
              `import { ${retrieved.icons.icons
                .map((e) => e.retrieved.join(" , "))
                .join(" , ")} } from "${retrieved.icons.import}";` +
              "\n```\n\n" +
              `# example: using an icon inside the component :\n\n` +
              "```" +
              component_ext +
              "\n" +
              `<${retrieved.icons.icons[0].retrieved[0]} className="h-4 w-4" />` +
              "\n```\n\n" +
              "---\n\n\n" +
              `Here are some available icons that might be relevant to the component you are making. You can choose from them if relevant :\n\n` +
              "```\n" +
              retrieved.icons.icons
                .map((e) => {
                  // return `- role : ${e.icon}\n  available icons: ${e.retrieved.join(' , ')}` // it confuses the gpt
                  return `- ${e.retrieved.join(" , ")}`;
                })
                .join("\n") +
              "\n```",
            //'icon stuff >' + JSON.stringify(retrieved.icons)
          }
        : false,
    ],
  ].filter((e) => e);

  return {
    type: `component-design-context`,
    success: true,
    data: component_context,
  };
}

module.exports = {
  run,
};
