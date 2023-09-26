branch to quick draft new features and integrations

will figure out merges later

tasks in progress

* ✅ starter templates for {react,next,svelte} x {shadcn,nextui,flowbite,~~daisyui~~}
* ✅ new dashboard template
* ⏳ dashboard+reactivity for each starter template
* ⏳ write { parsers + library builders + code adapters } for each {framework x component library}
  * react
    * ✅ shadcn : `shadcn-ui/ui`
    * ✅ nextui : `nextui-org/nextui`
    * ✅ flowbite : `themesberg/flowbite-react` - *// what a headache lmao*
    * ~~daisyui : `daisyui/react-daisyui`~~ *abandoned daisyui, maybe later*
  * next
    * ✅ shadcn : `shadcn-ui/ui`
    * nextui : `nextui-org/nextui` - *base on react, needs extra replace step to import components from individual exports as specified in docs*
    * ✅ flowbite : `themesberg/flowbite-react` - *should port directly from react, yet to be tested*
    * ~~daisyui : `daisyui/daisyui.github.io`~~ *abandoned daisyui, maybe later*
  * svelte
    * shadcn : `huntabyte/shadcn-svelte`
    * ✅ nextui : `nextui-org/nextui` *still need to inject <react:> and do react-preprocess imports, probably at validation pass during generation*
    * flowbite : `themesberg/flowbite-svelte`
    * ~~daisyui : `daisyui/daisyui.github.io`~~ *abandoned daisyui, maybe later*
* ⏳ prettify all code blocks inside json files in library/{framework}/{library} db dumps    
* ⏳ [...] (will add here as i go )
* ⏳ @pi0 structure & @denyncrawford virtual components + db
