import "dotenv/config";
import fs from "node:fs";
import { Schema } from "mongoose";
import { OpenAI } from "openai";

import db_shadcn from "../../library/shadcn_dump.json" assert { type: "json" };

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function _mkdir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}
_mkdir(`./generated/logs`);
_mkdir(`./generated/logs/design_task`);

/*
  in  -> gets a new component generation query string
  out -> a description for the component + selects library components to use
*/

const components_schema = {
  new_component_name: { type: String, required: true },
  new_component_description: {
    type: String,
    required: true,
    description: `Write a description for the React component design task based on the user query. Stick strictly to what the user wants in their request - do not go off track`,
  },
  new_component_icons_elements: {
    does_new_component_need_icons_elements: { type: Boolean, required: true },
    if_so_what_new_component_icons_elements_are_needed: [{ type: String }],
  },
  use_library_components: [
    {
      library_component_name: {
        type: String,
        enum: db_shadcn.map((e) => e.name),
      },
      library_component_usage_reason: String,
    },
  ],
};

async function run(req) {
  /*
  console.dir(
    (new Schema( components_schema , {_id:false})).jsonSchema(),
    {depth:6}
  )
  */

  const context = [
    {
      role: `system`,
      content:
        `Your task is to design a new React component for a web app, according to the user's request.\n` +
        `If you judge it is relevant to do so, you can specify pre-made library components to use in the task.\n` +
        `You can also specify the use of icons if you see that the user's request requires it.`,
    },
    {
      role: `user`,
      content:
        "Multiple library components can be used while creating a new component in order to help you do a better design job, faster.\n\nAVAILABLE LIBRARY COMPONENTS:\n```\n" +
        db_shadcn
          .map((e) => {
            return `${e.name} : ${e.description.slice(0, -1)};`;
          })
          .join("\n") +
        "\n```",
    },
    {
      role: `user`,
      content:
        "USER QUERY : \n```\n" +
        req.query +
        "\n```\n\n" +
        `Design the new React web component task for the user as the creative genius you are`,
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
  console.dir({
    pass: `./modules/multipass/design_task.js`,
    ...req,
    message: `started design task process`,
  });

  // const completion = await openai.chat.completions.create(gptPrompt)

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
      completion += part.choices[0]?.delta?.function_call.arguments || "";
    } catch (e) {
      false;
    }
  }

  const component_design = {
    ...{
      new_component_name: false,
      new_component_description: false,
      new_component_icons_elements: false,
      use_library_components: false,
    },
    //...JSON.parse( completion.choices[0].message.function_call.arguments ) // breaks sometimes, using eval instead
    // ...eval(`(${completion.choices[0].message.function_call.arguments})`)
    ...eval(`(${completion})`),
  };

  console.dir(component_design, { depth: null });

  const component_task = {
    name: component_design.new_component_name,
    description: {
      by_user: req.query,
      by_llm: component_design.new_component_description,
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
    library_components: !component_design.use_library_components
      ? false
      : component_design.use_library_components.map((e) => {
          return {
            name: e.library_component_name,
            usage: e.library_component_usage_reason,
          };
        }),
  };

  fs.writeFileSync(
    `./generated/logs/design_task/${Date.now()}.json`,
    JSON.stringify({
      ...req,
      context,
      completion,
    }),
  );

  return component_task;

  /*
  console.dir( answer.data.choices[0].message.function_call.arguments , {depth:7} )
	const args = JSON.parse( answer.data.choices[0].message.function_call.arguments )
	console.dir(args , {depth:7})
  */
}
export { run };
