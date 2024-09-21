const fs = require("fs");
const mongoose = require("mongoose-schema-jsonschema")();
const config = require("mongoose-schema-jsonschema/config");
const { Schema } = require("mongoose");
const schema = require("schm");
const { validate } = schema;
const { OpenAI } = require("openai");
require("dotenv").config();
const path = require("path");
const openai = new OpenAI({
  baseURL: process.env.OPENAI_API_BASEURL,
  apiKey: process.env.OPENAI_API_KEY,
});

function _titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function _randomUid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

LIBRARY_COMPONENTS_MAP = {};
fs.readdirSync(`./library/components`)
  .filter((e) => !e.includes(`.`))
  .map((framework) => {
    LIBRARY_COMPONENTS_MAP[framework] = {};
    fs.readdirSync(`./library/components/${framework}`)
      .filter((e) => !e.includes(`.`))
      .map((components) => {
        LIBRARY_COMPONENTS_MAP[framework][components] = require(
          `../../../../library/components/${framework}/${components}/dump.json`,
        ).map((e) => {
          return {
            name: e.name,
            description: e.description,
          };
        });
      });
  });

async function run(req) {
  console.log("> init : " + __dirname.split(path.sep).slice(-2).join(`/`));

  const components_schema = {
    new_component_name: { type: String, required: true },
    new_component_description: {
      type: String,
      required: true,
      description: `Write a description for the ${_titleCase(
        req.query.framework,
      )} component design task based on the user query. Stick strictly to what the user wants in their request - do not go off track`,
    },
    new_component_icons_elements: {
      does_new_component_need_icons_elements: { type: Boolean, required: true },
      if_so_what_new_component_icons_elements_are_needed: [{ type: String }],
    },
    use_library_components: [
      {
        library_component_name: {
          type: String,
          enum: LIBRARY_COMPONENTS_MAP[req.query.framework][
            req.query.components
          ].map((e) => e.name),
        },
        library_component_usage_reason: String,
      },
    ],
  };

  const context = [
    {
      role: `system`,
      content:
        `Your task is to design a new ${req.query.framework} component for a web app, according to the user's request.\n` +
        `If you judge it is relevant to do so, you can specify pre-made library components to use in the task.\n` +
        `You can also specify the use of icons if you see that the user's request requires it.`,
    },
    {
      role: `user`,
      content:
        "Multiple library components can be used while creating a new component in order to help you do a better design job, faster.\n\nAVAILABLE LIBRARY COMPONENTS:\n```\n" +
        LIBRARY_COMPONENTS_MAP[req.query.framework][req.query.components]
          .map((e) => {
            return `${e.name} : ${e.description};`;
          })
          .join("\n") +
        "\n```",
    },
    {
      role: `user`,
      content:
        "USER QUERY : \n```\n" +
        req.query.description +
        "\n```\n\n" +
        `Design the new ${req.query.framework} web component task for the user as the creative genius you are`,
    },
  ];

  const gptPrompt = {
    model: process.env.OPENAI_MODEL,
    messages: context,
    functions: [
      {
        name: `design_new_component_api`,
        description: `generate the required design details to create a new component`,
        parameters: new Schema(components_schema, { _id: false }).jsonSchema(),
      },
    ],
  };

  let completion = "";
  const stream = await openai.chat.completions.create({
    ...gptPrompt,
    stream: true,
  });
  for await (const part of stream) {
    try {
      process.stdout.write(
        part.choices[0]?.delta?.function_call.arguments || "",
      );
    } catch (e) {
      false;
    }
    try {
      const chunk = part.choices[0]?.delta?.function_call.arguments || "";
      completion += chunk;
      req.stream.write(chunk);
    } catch (e) {
      false;
    }
  }

  req.stream.write(`\n`);

  const component_design = {
    ...{
      new_component_name: false,
      new_component_description: false,
      new_component_icons_elements: false,
      use_library_components: false,
    },
    ...eval(`(${completion})`),
  };

  const component_task = {
    name: `${component_design.new_component_name}_${_randomUid(5)}`,
    description: {
      user: req.query.description,
      llm: component_design.new_component_description,
    },
    icons: !component_design.new_component_icons_elements
      ? false
      : !(
          component_design.new_component_icons_elements
            .does_new_component_need_icons_elements &&
          component_design.new_component_icons_elements
            .if_so_what_new_component_icons_elements_are_needed &&
          component_design.new_component_icons_elements
            .if_so_what_new_component_icons_elements_are_needed.length
        )
      ? false
      : component_design.new_component_icons_elements.if_so_what_new_component_icons_elements_are_needed.map(
          (e) => e.toLowerCase(),
        ),
    components: !component_design.use_library_components
      ? false
      : component_design.use_library_components.map((e) => {
          return {
            name: e.library_component_name,
            usage: e.library_component_usage_reason,
          };
        }),
  };

  return {
    type: `component-design-task`,
    success: true,
    data: component_task,
  };
}

module.exports = {
  run,
};
