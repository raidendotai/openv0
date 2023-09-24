const ShadcnModel = require('../db/models/shadcn_component.model.js');
const shadcn_db = ShadcnModel

async function run(query){
  return (await shadcn_db.find({})).filter(e=> query.library_components.map(e=>e.toLowerCase()).includes(e.name.toLowerCase())) || []
}

module.exports = {
  run
};
