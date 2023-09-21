// to rebuild components in webapp;
// ie after you delete components, run node refresh_webapp.js

async function refresh() {
  import export_react from "./modules/export/react.mjs";
  await export_react.dump_webapp();
}
refresh();
