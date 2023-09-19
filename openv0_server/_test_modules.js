

/*
const { LocalIndex } = require('vectra')
const index = new LocalIndex('vectordb_lucide')
async function db_vectra_build(){
  const lucide_with_embeddings = require(`./library/lucide_with_embeddings_dump.json`)

  if (!await index.isIndexCreated()) {
      await index.createIndex();
  }
  for (let e of lucide_with_embeddings){
    console.log(e.name)
    await index.insertItem({
        vector: e.embedding,
        metadata: { name: e.name }
    })
  }
}
db_vectra_build()
*/

/*
const { LocalIndex } = require('vectra')
const index = new LocalIndex('vectordb_lucide')
async function db_vectra_query_test(){
  const lucide_with_embeddings = require(`./library/lucide_with_embeddings_dump.json`)

  const example = lucide_with_embeddings[500]
  console.log(`> ${example.name}`)
  const results = await index.queryItems( example.embedding , 6);
  console.dir(results.slice(1,).map(e=>e.item.metadata) )
}
db_vectra_query_test()
*/


/*
const db_shadcn = require(`./modules/db/shadcn.js`)
const db_lucide = require(`./modules/db/lucide.js`)


async function test(){
  await db_shadcn.build()
  // await db_lucide.build()
  // await db_lucide.embeddings() //<------- calls ada-002 in batch !
}
test()
*/



/*
const component_design_task = require(`./modules/multipass/component_design_task.js`)
async function test(){
  const queries = [
    `a tweet UI`,
    `a pricing page for a SaaS`,
    `a component that displays a simple paragraph`,
    `a cookie consent banner`,
    `a table of financial invoices`,
  ]

  console.dir(
    (
      await component_design_task.run({
        query: queries[0],
      })
    ),
    {depth:null}
  )

}
test()
*/


/*
const rag_icons = require(`./modules/multipass/rag_icons.js`)
async function test(){
  console.dir(
    (
      await rag_icons.run({
        icons: [`cookies` , `new notification`, `friend request`],
      })
    ),
    {depth:null}
  )

}
test()
*/

/*
const rag_library_components = require(`./modules/multipass/rag_library_components.js`)
async function test(){
  console.dir(
    (
      await rag_library_components.run({
        components: [`Avatar` , `Button`],
      })
    ),
    {depth:null}
  )

}
test()
*/

/*
const context_builder = require(`./modules/multipass/context_builder.js`)
async function test(){
  console.log(
    JSON.stringify(
      await context_builder.run({
        icons: [`checkmark`],
        library_components: [ {name: `Card`} , {name: `Button`} ],
      })
    )
  )

}
test()
*/





/*
const design_task = require(`./modules/multipass/design_task.js`)
const context_builder = require(`./modules/multipass/context_builder.js`)
const generate_component = require(`./modules/multipass/generate_component.js`)
async function test(){


  const task = await design_task.run({
    query: `a component that display an example Lorem Ipsum paragraph (write it)`
  })
  console.dir(task)



  const task = {
    name: 'TweetUI',
    description: {
      by_user: 'a tweet UI component',
      by_llm: "Design a new React component that's styled in a similar fashion to a tweet on Twitter. It should include a user profile picture (Avatar), the user's name, the tweet text, a timestamp, and options for reply, retweet, like, and share a tweet. It should also show the number of replies, retweets, and likes. All the information will be passed via props."
    },
    icons: [ 'reply', 'retweet', 'heart', 'share' ],
    library_components: [
      { name: 'Avatar', usage: "To display the user's profile picture." },
      {
        name: 'Card',
        usage: 'To structure and organize the tweet information.'
      },
      {
        name: 'Button',
        usage: 'To create interactive reply, retweet, like, and share buttons.'
      },
      {
        name: 'Label',
        usage: 'To give more information about displayed data such as number of replies, retweets, or likes.'
      }
    ]
  }


  const context = await context_builder.run(task)
  // console.dir(context)
  const generated = await generate_component.run({task,context})


}
test()
*/








/*
const generate = require(`./generate.js`)
async function test(){



  await generate.new_component({
    query: `A Notes app UI looks like Apple's, in a yellow theme color`
  })


  await generate.iterate_component({
    componentId: `NotesApp_ts24v`,
    query: `the left half of the layout should be at the bottom instead !`,
  })



}
test()
*/
