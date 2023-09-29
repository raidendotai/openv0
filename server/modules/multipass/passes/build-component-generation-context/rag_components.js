async function run(query) {
  // query : { components : ['component_suggested_by_llm',...] , framework : 'react', library : 'nextui' }

  if (!query.components || !query.components.length) return [];

  const components_library = require(
    `../../../../library/components/${query.framework}/${query.library}/dump.json`,
  );

  return components_library.filter((e) => {
    return query.components
      .map((e) => e.toLowerCase())
      .includes(e.name.toLowerCase());
  });
}

module.exports = {
  run,
};
