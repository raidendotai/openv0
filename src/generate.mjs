import fs from "node:fs";

import * as design_task from "./modules/multipass/design_task.mjs";
import * as iterate_task from "./modules/multipass/iterate_task.mjs";

import * as context_builder from "./modules/multipass/context_builder.mjs";
import * as generate_component from "./modules/multipass/generate_component.mjs";

import * as export_react from "./modules/export/react.mjs";

function _randomId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function new_component(req) {
  // {query}

  const task = await design_task.run(req); // -> { name, description{by_user,by_llm}, icons, library_components }
  const context = await context_builder.run(task); // -> context[]
  const code = await generate_component.new_component({ task, context }); // -> generated_code

  /*
  const task = { name:`Dummy` , description: {by_user: `dummy prompt`} }
  const code = `import something_dummy;`
  */

  const componentId = task.name.replaceAll(" ", "") + `_` + _randomId(5);
  const timestamp = Date.now();

  await export_react.save_component({
    componentId,
    slug: componentId.toLowerCase(),
    name: task.name,
    prompt: task.description.by_user,
    timestamp,
    version: `${timestamp}`,
    code,
  });
  await export_react.dump_webapp();
  return {
    componentId,
    version: `${timestamp}`,
    code,
  };
}
async function iterate_component(req) {
  // {query : `user_query` , componentId ,}

  // fetch last version of component
  const components_list = fs
    .readdirSync(`./generated/components/${req.componentId}`)
    .filter((e) => e.endsWith(`.json`))
    .sort();
  const previous_component = {
    ...JSON.parse(
      fs.readFileSync(
        `./generated/components/${req.componentId}/${
          components_list.slice(-1)[0]
        }`,
        "utf-8",
      ),
    ),
    code: fs.readFileSync(
      `./generated/components/${req.componentId}/${
        components_list.slice(-1)[0].split(".")[0]
      }.tsx`,
      "utf-8",
    ),
  };
  const first_component = {
    ...JSON.parse(
      fs.readFileSync(
        `./generated/components/${req.componentId}/${components_list[0]}`,
        "utf-8",
      ),
    ),
    code: fs.readFileSync(
      `./generated/components/${req.componentId}/${
        components_list[0].split(".")[0]
      }.tsx`,
      "utf-8",
    ),
  };

  const iteration_task = await iterate_task.run({
    query: req.query,
    previous: {
      name: previous_component.name,
      description: first_component.prompt,
    },
  }); // -> { name, description{by_user,by_llm}, icons, library_components }

  const task = {
    name: previous_component.name,
    ...iteration_task,
  };
  const iteration_context = await context_builder.run(task); // -> context[]
  const context = [
    ...iteration_context,
    /*
    {
      role: `user`,
      content: ``,
    },
    */
  ];

  const code = await generate_component.iterate_component({
    task,
    context,
    previous: {
      description: first_component.prompt,
      code: previous_component.code,
    },
  }); // -> generated_code

  const componentId = req.componentId;
  const timestamp = Date.now();

  await export_react.save_component({
    componentId,
    slug: componentId.toLowerCase(),
    name: task.name,
    prompt: task.description.by_user,
    timestamp,
    version: `${timestamp}`,
    code,
  });
  await export_react.dump_webapp();
  return {
    componentId,
    version: `${timestamp}`,
    code,
  };
}
export { new_component, iterate_component };
