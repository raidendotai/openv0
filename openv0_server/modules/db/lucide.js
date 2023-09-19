const fs = require('fs');
const path = require('path');

const { OpenAI } = require('openai')
require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function build_from_docs(){
	return (
    await Promise.all(
      fs.readdirSync(`./library/lucide`).map( async (file) => {
				const icon_data = JSON.parse( fs.readFileSync( path.join(`./library/lucide`, file) , 'utf8') )
				return {
					source: file,
					name: file.split('.json')[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''),
					title: file.split('.json')[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
					tags: icon_data.tags,
					categories: icon_data.categories,
				}
			})
		)
	)
}

async function embeddings(){
	// generate embeddings for icons {name,tags,categories} for RAG later on

	fs.writeFileSync(
		`./library/lucide_with_embeddings_dump.json`,
		JSON.stringify(
			(
				await Promise.all(
					( JSON.parse( fs.readFileSync( `./library/lucide_dump.json` ) , 'utf8') ).map( async (e,idx) => {
						const response = await openai.embeddings.create({
							input: `name: ${e.title}\ncategories: ${e.categories.join(',')}\ntags: ${e.tags.join(',')}` ,
							model: 'text-embedding-ada-002',
						})
						console.log(idx)
						return {
							...e,
							embedding : response.data[0].embedding
						}
					})
				)
			)
		)
	)


}

async function build(){
	const db = await build_from_docs()
	fs.writeFileSync( `./library/lucide_dump.json`, JSON.stringify(db) )
}

module.exports = {
	build,
	embeddings,
};
