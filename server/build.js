async function components() {
  // framework x component lib dumps
  await Promise.all(
    [`react`, `next`, `svelte`]
      .map((framework) => {
        return [`flowbite`, `nextui`, `shadcn`].map((component_library) => {
          return `./build/components/${framework}/${component_library}.js`;
        });
      })
      .flat()
      .map(async (build_module) => {
        try {
          await require(build_module).build();
        } catch (e) {
          console.dir({ skip: build_module });
        }
      }),
  );
}

async function allowed_imports() {
  // list available packages from webapps-starters node_modules folder
  // append the imports from libraries? (ie. in components/lib, not in node_modules)
  await Promise.all(
    [`react`, `next`, `svelte`]
      .map((framework) => {
        return [`flowbite`, `nextui`, `shadcn`].map((component_library) => {
          return `./build/allowed_imports/${framework}/${component_library}.js`;
        });
      })
      .flat()
      .map(async (build_module) => {
        try {
          await require(build_module).build();
        } catch (e) {
          console.dir({ skip: build_module });
        }
      }),
  );
}

module.exports = {
  components,
  allowed_imports,
};
