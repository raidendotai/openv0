const fs = require('fs')
const mongoose = require('mongoose-schema-jsonschema')();
const config = require('mongoose-schema-jsonschema/config');
const {Schema} = require('mongoose');
const schema = require('schm');
const {validate} = schema;
const { OpenAI } = require('openai')
require('dotenv').config();

const db_shadcn = require(`../../library/shadcn_dump.json`)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function _mkdir(path){
	if (!fs.existsSync(path)) fs.mkdirSync(path)
}
_mkdir(`./generated/logs`)
_mkdir(`./generated/logs/iterate_task`)

/*
  in  -> gets a new component generation query string
  out -> a description for the component + selects library components to use
*/


const components_schema = {

  // new_component_name: { type: String, required: true, },
  new_component_description: {
    type: String,
    required: true,
    description: `Write a description for the React component update task based on the user query. Stick strictly to what the user wants in their request - do not go off track`
  },

  new_component_icons_elements: {
    does_new_component_need_icons_elements : {type: Boolean, required: true} ,
    if_so_what_new_component_icons_elements_are_needed: [{type:String}],
  },
  use_library_components: [
    {
      library_component_name: {
        type: String,
        enum: db_shadcn.map(e=>e.name)
      },
      library_component_usage_reason: String,
    }
  ]
}

async function run(req){
  /*
    query: string, // iteration query
    previous: {
      name,
      description,
  },
  */


  const context = [
    {
      role: `system`,
      content: `Your task is to modify a React component for a web app, according to the user's request.\n`
                + `If you judge it is relevant to do so, you can specify pre-made library components to use in the component update.\n`
                + `You can also specify the use of icons if you see that the user's update request requires it.`
    },
    {
      role: `user`,
      content: "Multiple library components can be used while creating a new component in order to help you do a better design job, faster.\n\nAVAILABLE LIBRARY COMPONENTS:\n```\n" + db_shadcn.map(e=> { return `${e.name} : ${e.description.slice(0,-1)};`  } ).join('\n') + "\n```"
    },
    {
      role: `user`,
      content:  `- Component name : ${req.previous.name}\n`
                + '- Component description : `'+ req.previous.description + '`\n'
                + "- New component updates query : \n```\n"
                + req.query
                + "\n```\n\n"
                + `Design the React web component updates for the user, as the creative genius you are`
    },
  ]




  const gptPrompt = {
		model: process.env.OPENAI_MODEL,
		messages: context,
		functions: [
			{
			  name: `design_updated_component_api`,
			  description: `generate the required design details to updated the provided component`,
			  parameters : (new Schema( components_schema , {_id:false})).jsonSchema() ,
			}
		],
	}
  console.dir({
    pass: `./modules/multipass/iterate_task.js`,
    ...req,
    message: `started iterate task process`,
  })

  // const completion = await openai.chat.completions.create(gptPrompt)

  let completion = ''
  const stream = await openai.chat.completions.create({
    ...gptPrompt,
    stream: true
  })
  for await (const part of stream) {
    try {
      process.stdout.write(part.choices[0]?.delta?.function_call.arguments || '');
    }catch(e){false}
    try {
      completion += part.choices[0]?.delta?.function_call.arguments || ''
    }catch(e){false}
  }


  const component_design = {
    ...{
      // new_component_name: false,
      new_component_description: false,
      new_component_icons_elements: false,
      use_library_components: false,
    },
    //...JSON.parse( completion.choices[0].message.function_call.arguments ) // breaks sometimes, using eval instead
    //...eval(`(${completion.choices[0].message.function_call.arguments})`)
    ...eval(`(${completion})`)
  }

  console.dir( component_design , {depth:null} )

  const component_task = {
    // name: component_design.new_component_name,
    description: {
      by_user: req.query,
      by_llm: component_design.new_component_description,
    },
    icons : !(component_design.new_component_icons_elements)
              ? false
              : !(
                  component_design.new_component_icons_elements.does_new_component_need_icons_elements
                  && component_design.new_component_icons_elements.if_so_what_new_component_icons_elements_are_needed
                  && component_design.new_component_icons_elements.if_so_what_new_component_icons_elements_are_needed.length
                  ) ? false
                    : component_design.new_component_icons_elements.if_so_what_new_component_icons_elements_are_needed.map(e=>e.toLowerCase()),
    library_components: !(component_design.use_library_components)
                          ? false
                          : component_design.use_library_components.map((e)=>{
                              return {
                                name: e.library_component_name,
                                usage: e.library_component_usage_reason,
                              }
                            }),
  }

  fs.writeFileSync(
    `./generated/logs/iterate_task/${Date.now()}.json`,
    JSON.stringify({
      ...req,
      context,
      completion,
    })
  )

  return component_task

  /*
  console.dir( answer.data.choices[0].message.function_call.arguments , {depth:7} )
	const args = JSON.parse( answer.data.choices[0].message.function_call.arguments )
	console.dir(args , {depth:7})
  */

}
module.exports = {
  run,
};
