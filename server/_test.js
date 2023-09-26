const build = require(`./build.js`)
async function test(){
  await build.everything()
}
test()
