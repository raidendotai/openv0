const fs = require("fs");
const path = require("path");

const { LocalIndex } = require(`vectra`);
const { OpenAI } = require("openai");
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run(query) {
  // query : { icons:["icon_suggested_by_llm" , "..."] , framework : 'svelte' , library : `lucide` }

  if (!query.icons || !query.icons.length)
    return {
      icons: [],
      import: require(
        `../../../../library/icons/${query.library}/metadata.json`,
      ).import[query.framework],
    };

  const vectorDB_index = new LocalIndex(
    `./library/icons/${query.library}/vectordb`,
  );

  const icons = await Promise.all(
    query.icons.map(async (e) => {
      return {
        icon: e,
        retrieved: (
          await vectorDB_index.queryItems(
            (
              await openai.embeddings.create({
                input: e,
                model: `text-embedding-ada-002`,
              })
            ).data[0].embedding,
            10,
          )
        )
          .slice(1)
          .map((e) => e.item.metadata.name),
      };
    }),
  );
  return {
    icons,
    import: require(`../../../../library/icons/${query.library}/metadata.json`)
      .import[query.framework],
  };
}

module.exports = {
  run,
};
