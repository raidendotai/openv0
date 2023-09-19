const fs = require('fs')
const path = require('path');
//const mongoose = require('mongoose-schema-jsonschema')();
//const config = require('mongoose-schema-jsonschema/config');
//const {Schema} = require('mongoose');
//const schema = require('schm');
//const {validate} = schema;
const { OpenAI } = require('openai')
const tiktoken = require("@dqbd/tiktoken");
const tiktokenEncoder = tiktoken.get_encoding("cl100k_base");


require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


function _mkdir(path){
	if (!fs.existsSync(path)) fs.mkdirSync(path)
}
_mkdir(`./generated/logs`)
_mkdir(`./generated/logs/generate_component`)
_mkdir(`./generated/components`)



async function new_component(query){
  // { task{ name,description{by_user,by_llm},icons,library_components } , context[{role,content},...] }
  // -> gets data made by design_task and context_builder, generates a new component
  // dump logs too
  const context = [
    {
      role: `system`,
      content: `You are an expert at writing React components.\n`
                + `Your task is to write a new React component for a web app, according to the provided task details.\n`
                + `The React component you write can make use of Tailwind classes for styling (in className).\n`
                + `If you judge it is relevant to do so, you can use library components and icons.\n\n`
                + `You will write the full React component code, which should include all imports.`
                + `Your generated code will be directly written to a .tsx React component file and used in production.`
    },
    ...query.context,
    {
      role: `user`,
      content: `- COMPONENT NAME : ${query.task.name}\n\n`
                + `- COMPONENT DESCRIPTION :\n` + '```\n' + query.task.description.by_user + '\n```\n\n'
                + `- additional component suggestions :\n` + '```\n' + query.task.description.by_llm + '\n```\n\n\n'
                + `Write the full code for the new React web component, which uses Tailwind classes in className if needed (add tailwind dark: classes too if you can), and optionally, library components and icons, based on the provided design task.\n`
                + 'The full code of the new React component that you write will be written directly to a .tsx file inside the React project. Make sure all necessary imports are done, and that your full code is enclosed with tsx``` blocks. Answer with generated code only, DO NOT ADD ANY EXTRA TEXT DESCRIPTION OR COMMENTS BESIDES THE CODE. YOUR ANSWER CONTAINS CODE ONLY ! COMPONENT CODE ONLY !\n'
                + `Important :\n`
                + `- DO NOT USE LIBRARIES OR IMPORTS OUTSIDE OF WHAT IS PROVIDED IN THIS TASK; otherwise it would crash the component because not installed. DO NOT IMPORT EXTRA LIBRARIES BESIDES WHAT IS PROVIDED ABOVE!\n`
                + `- DO NOT HAVE ANY DYNAMIC DATA! Components are meant to be working as is without supplying any variable to them when importing them ! ONLY WRITE A COMPONENT THAT RENDER DIRECTLY WITH PLACEHOLDERS AS DATA, COMPONENT NOT SUPPLIED WITH ANY DYNAMIC DATA.\n`
                + `- Only write the code for the component; Do not write extra code to import it! The code will directly be stored in an individual React .tsx file !\n`
                + `Write the React component code as the creative genius and React component genius you are - with good ui formatting.\n`
    }
  ]

  const gptPrompt = {
		model: process.env.OPENAI_MODEL,
		messages: context,
		/*functions: [
			{
			  name: `generate_new_react_component_to_send_to_api`,
			  description: `Write the full code for a new React component, which uses Tailwind classes in className, and optionally, library components and icons, based on the provided design task`,
			  parameters : (new Schema( generate_component_schema , {_id:false})).jsonSchema() ,
			}
		],*/
	}
  console.dir({
    context : context.map(e=>{ return {role: e.role , content: e.content.slice(0,200) + ' ...'} })
  })

  console.log('--------------------------------')
  const context_prompt_tokens = tiktokenEncoder.encode(
    context.map(e=>e.content).join('')
  ).length
  console.log(`total context prompt tokens (estimate) : ${context_prompt_tokens}`)
  console.log('---------------------------------')


  let completion = ''
  const stream = await openai.chat.completions.create({
    ...gptPrompt,
    stream: true
  })
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
    try {
      completion += part.choices[0]?.delta?.content || ''
    }catch(e){false}
  }

  // console.dir(completion , {depth:null})

  let generated_code = ``
  let start = false
  for (let l of completion.split('\n') ) {
    let skip = false
    if ( l.trim() === '```' || l.trim() === 'tsx```' || l.trim() === '```tsx' ) {
      start = !start
      skip = true
    }
    if (start && !skip) generated_code += `${l}\n`
  }
  generated_code = generated_code.trim()

  console.log('******************************************')
  console.dir( {generated_code} , {depth:null} )

  fs.writeFileSync(
    `./generated/logs/generate_component/${Date.now()}.json`,
    JSON.stringify({
      task: query.task,
      context,
      completion,
    })
  )

  return generated_code

}




















async function iterate_component(query){
  // { task{ name,description{by_user,by_llm},icons,library_components } , context[{role,content},...] , previous{} }
  // -> gets data made by design_task and context_builder, generates a new component iteration
  // dump logs too
  const context = [
    {
      role: `system`,
      content: `You are an expert at writing React components.\n`
                + `Your task is to write a new version of the provided React component for a web app, according to the provided task details.\n`
                + `The React component you write can make use of Tailwind classes for styling (in className).\n`
                + `If you judge it is relevant to do so, you can use library components and icons.\n\n`
                + `You will write the full React component code, which should include all imports.`
                + `Your generated code will be directly written to a .tsx React component file and used in production.`
    },
    ...query.context,
    {
      role: `user`,
      content: `- COMPONENT NAME : ${query.task.name}\n\n`
                + `- COMPONENT DESCRIPTION :\n` + '```\n' + query.previous.description + '\n```\n\n'
                + `- CURRENT COMPONENT CODE :\n\n` + '```tsx\n' + query.previous.code + '\n```\n\n'
                + `- DESIRED COMPONENT UPDATES :\n\n` + '```tsx\n' + query.task.description.by_user + '\n```\n\n'
                + `- additional component update suggestions :\n` + '```\n' + query.task.description.by_llm + '\n```\n\n\n'
                + `Write the full code for the new, updated React web component, which uses Tailwind classes in className if needed (add tailwind dark: classes too if you can), and optionally, library components and icons, based on the provided design task.\n`
                + 'The full code of the new React component that you write will be written directly to a .tsx file inside the React project. Make sure all necessary imports are done, and that your full code is enclosed with ```tsx blocks. Answer with generated code only, DO NOT ADD ANY EXTRA TEXT DESCRIPTION OR COMMENTS BESIDES THE CODE. YOUR ANSWER CONTAINS CODE ONLY ! COMPONENT CODE ONLY !\n'
                + `Important :\n`
                + `- DO NOT USE LIBRARIES OR IMPORTS OUTSIDE OF WHAT IS PROVIDED IN THIS TASK; otherwise it would crash the component because not installed. DO NOT IMPORT EXTRA LIBRARIES BESIDES WHAT IS PROVIDED ABOVE!\n`
                + `- DO NOT HAVE ANY DYNAMIC DATA! Components are meant to be working as is without supplying any variable to them when importing them ! ONLY WRITE A COMPONENT THAT RENDER DIRECTLY WITH PLACEHOLDERS AS DATA, COMPONENT NOT SUPPLIED WITH ANY DYNAMIC DATA.\n`
                + `- Only write the code for the component; Do not write extra code to import it! The code will directly be stored in an individual React .tsx file !\n`
                + `Write the updated version of the React component code as the creative genius and React component genius you are - with good ui formatting.\n`
    }
  ]

  const gptPrompt = {
		model: process.env.OPENAI_MODEL,
		messages: context,
	}
  console.dir({
    context : context.map(e=>{ return {role: e.role , content: e.content.slice(0,200) + ' ...'} })
  })

  console.log('---------------------------------')
  const context_prompt_tokens = tiktokenEncoder.encode(
    context.map(e=>e.content).join('')
  ).length
  console.log(`total context prompt tokens (estimate) : ${context_prompt_tokens}`)
  console.log('---------------------------------')


  let completion = ''
  const stream = await openai.chat.completions.create({
    ...gptPrompt,
    stream: true
  })
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
    try {
      completion += part.choices[0]?.delta?.content || ''
    }catch(e){false}
  }

  // console.dir(completion , {depth:null})

  let generated_code = ``
  let start = false
  for (let l of completion.split('\n') ) {
    let skip = false
    if ( l.trim() === '```' || l.trim() === 'tsx```' || l.trim() === '```tsx' ) {
      start = !start
      skip = true
    }
    if (start && !skip) generated_code += `${l}\n`
  }
  generated_code = generated_code.trim()

  /*
  const generated_code = (
    completion.choices[0].message.content
  ).trim().split('\n').slice(1,-1).join('\n')
  */
  console.log('******************************************')
  console.dir( {generated_code} , {depth:null} )

  fs.writeFileSync(
    `./generated/logs/generate_component/${Date.now()}.json`,
    JSON.stringify({
      task: query.task,
      context,
      completion,
    })
  )

  return generated_code

}










module.exports = {
  new_component,
  iterate_component,
};
