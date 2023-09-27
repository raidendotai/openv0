async function everything(){
  // framework x component lib
  await Promise.all(
    (
      (
        [
          // `react`,
          `next`,
          // `svelte`
        ].map( framework => {
          return [
            // `flowbite`,
            `nextui`,
            // `shadcn`
          ].map(
            (component_library) => {
              return `./build/components/${framework}/${component_library}.js`
            }
          )
        }).flat()
      ).map( async (build_module) => {
        await require(build_module).build()
      })
    )
  )
}
module.exports = {
  everything,
}
