module.exports = {
  componentNew_description: {
    description: `generate a new component from a text description`,
    passes: [
      `design-component-new-from-description`,
      `build-component-generation-context`,
      `generate-component-new`,
      `validate-check-generated-component`,
      `validate-fix-generated-component`,
      `postprocess-generated-component`,
      `store-component`,
      `export-component`,
    ],
  },

  componentNew_json: {
    description: `generate a new component from a json object/string (ie. to draft components from API responses)`,
    passes: [
      `design-component-new-from-json`,
      `build-component-generation-context`,
      `generate-component-new`,
      `validate-check-generated-component`,
      `validate-fix-generated-component`,
      `postprocess-generated-component`,
      `store-component`,
      `export-component`,
    ],
  },

  componentIterate_description: {
    description: `iterate on a previously generated component from a text that describes new updates`,
    passes: [
      `design-component-iteration-from-description`,
      `build-component-generation-context`,
      `generate-component-iteration`,
      `validate-check-generated-component`,
      `validate-fix-generated-component`,
      `postprocess-generated-component`,
      `store-component`,
      `export-component`,
    ],
  },

  appNew_text: {
    description: `generate a boilerplate web app from a text description`,
    passes: [],
  },
};
