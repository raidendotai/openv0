- building library to be used in multipass stages
- refer to these modules to learn how to extend openv0 to new frameworks/libraries/plugins
- build modules are called from /build.js in server root

---

# building components library

dirty parsing docs and folders to generate components library

### build/components/...

generates components db assets in :

- `/library/components/{framework}/{components_library}/dump.json` →

### build/allowed_imports/...

used to validate components post-generation, using server side babel (ie. hallucinated imports, missing imports)

can either be achieved by:

- listing node_modules packages inside webapps
- hardcoding allowed imports; ie :
  - shadcn-svelte doesnt create a node_modules/packages, components saved directly in /src
  - (later on) importing other generated components inside generated UI view

metadata should have import paths (ie. `@nextui-org/react`) and prefixes as well (ie. `@/components/`)

generates components metadata assets in :

- `/library/components/{framework}/{components_library}/metadata.json` →

---

# building icons library

### build/icons

generates icons db assets :

- `/library/icons/{icons_library}/dump.json` → icon name and metadata
- `/library/icons/{icons_library}/metadata.json` → metadata to know how to import icons library in each framework
- `/library/icons/{icons_library}/vectordb/index.json` → local vector DB using vectra
