const fs = require(`fs`);
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

/*
async function babelInsteadOfCheerio(){
  const mdxString = `
  <CodePreview title="Collapse all" className="dark:bg-gray-900">
    <>
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>What is Flowbite?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to&nbsp;
            <a
              href="https://flowbite.com/docs/getting-started/introduction/"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              get started
            </a>
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Is there a Figma file available?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
            has a design equivalent in our Figma file.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the
            <a href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
              Figma design system
            </a>
            based on the utility classes from Tailwind CSS and components from Flowbite.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>What are the differences between Flowbite and Tailwind UI?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
            components, whereas Tailwind UI offers sections of pages.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
            technical reason stopping you from using the best of two worlds.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
            <li>
              <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                Flowbite Pro
              </a>
            </li>
            <li>
              <a
                href="https://tailwindui.com/"
                rel="nofollow"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Tailwind UI
              </a>
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
    </>
  </CodePreview>
  `.trim()
  const ast = parser.parse(mdxString, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  let codeContent = ''
  traverse(ast, {
    JSXElement(path) {
      if (path.node.openingElement.name.name === 'CodePreview') {
        const start = path.node.openingElement.end;
        const end = path.node.closingElement.start;
        codeContent = mdxString.slice(start,end);
      }
    },
  });

  //console.log(codeContent);

}
babelInsteadOfCheerio()
process.exit(0)
*/

const build = require(`./build.js`);
// buildTest()

function _extractImports(code) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: [
      "jsx",
      "tsx",
      "typescript",
      "react",
      //"@babel/plugin-proposal-class-properties",
      //"@babel/plugin-proposal-object-rest-spread"
    ],
    allowJSX: true,
    parser: "babel-eslint",
    extends: ["eslint:recommended", "plugin:react/recommended"],
    presets: ["@babel/env", "@babel/preset-react"],
  });

  const imports = {};

  traverse(ast, {
    ImportDeclaration(path) {
      const source = path.node.source.value;
      const specifiers = path.node.specifiers;

      if (!imports[source]) {
        imports[source] = [];
      }

      specifiers.forEach((specifier) => {
        if (specifier.type === "ImportSpecifier") {
          imports[source].push(specifier.imported.name);
        } else if (specifier.type === "ImportDefaultSpecifier") {
          imports[source].push("default");
        }
      });
    },
  });

  const importList = Object.entries(imports).map(([from, imported]) => ({
    from,
    imported,
  }));

  return importList;
}

const tsxCode = `
import {User, Link} from "@nextui-org/react";
import {
	Card,
	CardItem,
	CardFooter
} from "@nextui-org/react";
import {LeftArrow} from "lucide-react";
import {HeartIcon, UserAvatar} from '$lib/lucide-react';
import ReactDOM from 'react-dom';


async function get_similar(){
	await fetch("https://api.example.com/similar/refresh")
}

export default function App() {
	return (
		<Card>
			<CardItem>
				<User name="Example User"></User>
			</CardItem>
			<CardFooter>
				New user data
			</CardFooter>
		</Card>
	)
}
`.trim();

const svelteCode = `
<script>
  import { Card, Button } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>

<Card>
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
  <Button class="w-fit">
    Read more <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
  </Button>
</Card>
`;
async function parseTest() {
  //process.exit(0)

  const db_libs = [
    `./library/components/svelte/flowbite/dump.json`,
    `./library/components/svelte/shadcn/dump.json`,

    `./library/components/react/flowbite/dump.json`,
    `./library/components/react/shadcn/dump.json`,
    `./library/components/react/nextui/dump.json`,

    `./library/components/next/flowbite/dump.json`,
    `./library/components/next/shadcn/dump.json`,
    `./library/components/next/nextui/dump.json`,
  ];

  let ALL_IMPORTS_MAP = {};

  db_libs.map((db_lib) => {
    const db = JSON.parse(fs.readFileSync(db_lib, `utf-8`));
    let success = 0;
    let fail = 0;

    ALL_IMPORTS_MAP[db_lib] = [];

    db.map((c) => {
      [
        c.docs.import.code,
        c.docs.use.map((_c) => _c.code),
        c.docs.examples.map((_c) => _c.code),
      ]
        .flat()
        .map((code) => {
          if (db_lib.includes("svelte")) {
            code = code
              .split("</script")[0]
              .trim()
              .split("\n")
              .slice(1)
              .join("\n"); // svelte, imports
          }

          try {
            const retrieved_imports = _extractImports(
              code,
              // code.split('</script')[0].trim().split('\n').slice(1,).join('\n') // svelte, imports
              // '<div>\n' + code.split('</script')[1].trim().split('\n').slice(1,).join('\n') + '\n</div>' // svelte, html
            );
            ALL_IMPORTS_MAP[db_lib].push(
              retrieved_imports.map((e) => e.from).flat(),
            );
            success++;
          } catch (e) {
            console.dir({
              db_lib,
              c,
              code,
              // code: code.split('</script')[0].trim().split('\n').slice(1,).join('\n'), // svelte, imports
              // code: '<div>\n'+code.split('</script')[1].trim().split('\n').slice(1,).join('\n')+'\n</div>', // svelte html
              e,
            });
            fail++;
          }
        });
    });
    console.dir({ db_lib, success, fail });

    const unique_imports = [...new Set(ALL_IMPORTS_MAP[db_lib].flat())];
    ALL_IMPORTS_MAP[db_lib] = [...[]];
    for (let _imp of unique_imports) {
      let _skip = false;
      for (let _e of [
        /*
        `@nextui-org/`,
        `@/components/ui/`,
        `@radix-ui/react-dropdown-menu`,
        `$lib/components/ui/`,
        `react-icons/`,
        `flowbite-svelte`,
        `flowbite-svelte-icons`,
        `@/lib/utils`,
        */
      ]) {
        if (_imp.startsWith(_e)) {
          _skip = true;
        }
      }
      if (!_skip) ALL_IMPORTS_MAP[db_lib].push(_imp);
    }
    ALL_IMPORTS_MAP[db_lib] = ALL_IMPORTS_MAP[db_lib].sort();

    /*
      console.dir(
        _extractImports(
          svelteCode.split(`<script>`)[1].split(`</script>`)[0].trim()
        ),
        {depth:null}
      )
      */
  });

  console.dir({ ALL_IMPORTS_MAP }, { depth: null });
}

async function test() {
  await build.allowed_imports();
  await build.components();
  await parseTest();
}
test();
