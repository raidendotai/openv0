const fs = require(`fs`)

/*
`./build/gits/nextui-org$nextui/apps/docs/content/docs/components` for title+desc+imports+usage+examples

^ point to code demos like this :
    <CodeDemo title="Usage" files={accordionContent.usage} />
    <CodeDemo title="With subtitle" files={accordionContent.subtitle} />
  or
    <ImportTabs
      commands={{
        main: 'import {Accordion, AccordionItem} from "@nextui-org/react";',
        individual: 'import {Accordion, AccordionItem} from "@nextui-org/accordion";',
      }}
    />

^ which are found under :

`./build/gits/nextui-org$nextui/apps/docs/content/components/` for code demos (?)

adapt imports individual/main in relation to whether using next or react (or svelte, via react:ComponentName prefix)
*/

function _replaceLastOccurrence(inputString, search, replacement) {
  const lastIndex = inputString.lastIndexOf(search);

  if (lastIndex === -1) {
    // If the search substring is not found, return the original string
    return inputString;
  }

  const beforeLastOccurrence = inputString.substring(0, lastIndex);
  const afterLastOccurrence = inputString.substring(lastIndex + search.length);

  const replacedString = beforeLastOccurrence + replacement + afterLastOccurrence;

  return replacedString;
}

async function build(){
  console.dir({build:`svelte/nextui`})
  const docs_files = fs.readdirSync(
    `./build/gits/nextui-org$nextui/apps/docs/content/docs/components`
  ).map(f=>`./build/gits/nextui-org$nextui/apps/docs/content/docs/components/${f}`)

  const db = docs_files/*.filter(e=>e.includes(`navbar`))*/.map(doc_file=>{

    const content = fs.readFileSync(doc_file,'utf-8')
    const [name,description] = content.split('---')[1].split('\n').map(l=>l.trim()).filter(l=>l.length).map( (e) =>{
      return e.split(`"`).slice(1,-1)
    }).flat()

    const use = [
      {
        source: `usage.svelte`,
        code : eval(
                  _replaceLastOccurrence(
                    fs.readFileSync(
                      `./build/gits/nextui-org$nextui/apps/docs/content/components/`
                      + doc_file.split('/').slice(-1)[0].split(`.mdx`)[0]
                      + `/usage.ts`,
                      'utf-8'
                    ),
                    `export default`,
                    `module.exports =`
                  )
                )[`/App.jsx`]
                .split(`\n`)
                .filter(l=> ( !( (l.includes(`import`)) && (l.includes(`./`))))) // ghost local imports
                .join(`\n`)
                .split(`export default function App() {`)[1]
                .split(`return (`).slice(-1)[0]
                .split(`)`).slice(0,-1).join(`)`)
      }
    ].filter(e=>e)//.filter(e=>e.code.includes(`export default function App`))

    const examples = fs.readdirSync(
      `./build/gits/nextui-org$nextui/apps/docs/content/components/`
      + doc_file.split('/').slice(-1)[0].split(`.mdx`)[0]
    ).filter(f => !([`index.ts`,`usage.ts`].includes(f)) ).map(f=>{
      return `./build/gits/nextui-org$nextui/apps/docs/content/components/`
            + doc_file.split('/').slice(-1)[0].split(`.mdx`)[0]
            + `/${f}`
    }).map(f=>{
      try {
        return {
          source: f.split('/').slice(-1)[0].split(`.`)[0] + `.svelte`,
          code: eval(
            _replaceLastOccurrence(
              fs.readFileSync(f,'utf-8'),
              `export default`,
              `module.exports =`
            ).replaceAll(`export const`,`const`) // <--- because badge/content-examples.ts messes up build
          )[`/App.jsx`]
          .split(`\n`)
          .filter(l=> ( !( (l.includes(`import`)) && (l.includes(`./`))))) // ghost local imports
          .join(`\n`)
          .split(`export default function App() {`)[1]
          .split(`return (`).slice(-1)[0]
          .split(`)`).slice(0,-1).join(`)`)
        }
      }catch(e){
        // console.log(fs.readFileSync(f,'utf-8'))
        console.log(`> cannot parse ${f}`)
        return false
      }
    }).filter(e=>e)//.filter(e=>e.code.includes(`export default function App`))


    const docs = {
      import : {
        source : doc_file.split('/').slice(-1)[0].split('.')[0] + '.svelte',
        code: content.split(`## Import`)[1].split(`## Usage`)[0].trim()
                      .split(`commands={{`)[1].split(`individual`)[0]
                      .split(`main:`)[1].trim().slice(1,-2).trim().split(/\s+/).join(' '),
      },
      use : use.filter(e=>!e.source.includes(`custom`)),
      examples : examples.filter(e=>!e.source.includes(`custom`)),
    }
    return {
      name,
      description:description.slice(0,-1),
      docs_path: doc_file,
      docs,
    }
  })

  fs.writeFileSync( `./library/components/svelte/nextui/dump.json`, JSON.stringify(db) )
  console.dir({
    build:`./build/components/svelte/nextui.js`,
    dump: `./library/components/svelte/nextui/dump.json`,
  })
}
module.exports = { build }
