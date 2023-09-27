branch to quick draft new features and integrations

will figure out merges later

tasks in progress

* ✅ starter templates for {react,next,svelte} x {shadcn,nextui,flowbite}
* ✅ new dashboard template
* ⏳ dashboard+reactivity for each starter template
* ⏳ write { parsers + library builders + code adapters } for each {framework x component library}
  * react
    * ✅ shadcn : `shadcn-ui/ui`
    * ✅ nextui : `nextui-org/nextui`
    * ✅ flowbite : `themesberg/flowbite-react` - *// what a headache lmao*

  * next
    * ✅ shadcn : `shadcn-ui/ui`
    * nextui : `nextui-org/nextui` - *base on react, needs extra replace step to import components from individual exports as specified in docs*
    * ✅ flowbite : `themesberg/flowbite-react`

  * svelte
    * ✅ shadcn : `huntabyte/shadcn-svelte` - *icons use lucide-svelte, careful to adapt this in server generation passes later*
    * ✅ flowbite : `themesberg/flowbite-svelte`
    * ~~✅ nextui : `nextui-org/nextui` *ported with react-preprocess, is buggy for dynamic data - disregard now, port library later*~~

* ⏳ prettify all code blocks inside json files in library/{framework}/{library} db dumps    
* ⏳ [...] (will add here as i go )
* ⏳ @pi0 structure & @denyncrawford virtual components + db
