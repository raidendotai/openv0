// to rebuild components in webapp;
// ie after you delete components, run node refresh_webapp.js

async function refresh(){
  const export_react = require(`./modules/export/react.js`)
  await export_react.dump_webapp()
}
refresh()
