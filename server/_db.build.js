const build = require(`./build.js`);
async function main() {
  await build.db();
}
main();
