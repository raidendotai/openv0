const shadcn_db = require(`../../library/shadcn_dump.json`)

async function run(query){
  return shadcn_db.filter(e=> query.library_components.map(e=>e.toLowerCase()).includes(e.name.toLowerCase()) )
}

module.exports = {
  run
};
