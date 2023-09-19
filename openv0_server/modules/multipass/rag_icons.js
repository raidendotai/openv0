const fs = require('fs');
const path = require('path');

const { LocalIndex } = require(`vectra`)
const { OpenAI } = require('openai')
require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const vectorDB_index = new LocalIndex(`./library/vector_db/lucide`)

async function run(query){
  return (
    await Promise.all(
      query.icons.map( async(e) => {
        return {
          icon: e,
          retrieved: (
            (
              await vectorDB_index.queryItems(
                (
                  (
                    (
                      await openai.embeddings.create({
                        input: e,
                        model: 'text-embedding-ada-002',
                      })
                    ).data[0].embedding
                  )
                ),
                7
              )
            )
          ).slice(1,).map(e=>e.item.metadata.name)
        }
      })
    )
  )

}

module.exports = {
  run
};
