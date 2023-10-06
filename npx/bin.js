#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs-extra');
const { promisify } = require('util');
const AdmZip = require("adm-zip");

const execAsync = promisify(exec);

const GIT_REPO = `https://github.com/raidendotai/openv0.git`;
const PROJECT_PATH = path.join( process.cwd() , `openv0` );
const GIT_CLONE_CMD = `git clone --depth 1 ${GIT_REPO} "${PROJECT_PATH}"`

let ENV = {
	OPENAI_MODEL : 'gpt-4',
	PASS__CONTEXT__COMPONENTS_LIBRARY_EXAMPLES__TOKEN_LIMIT: 600,
	OPENV0__COLLECT_UIRAY: 1,
	OPENV0__API: "https://api.openv0.com",
	API__GENERATE_ATTEMPTS: 1, // not implemented yet
	WEBAPP_ROOT: "../webapp",
}

const FRAMEWORK_COMPONENTS_MAP = {
  react: ['nextui','flowbite','shadcn'],
  svelte: ['flowbite','shadcn'],
  next: ['nextui','flowbite','shadcn'],
};
const FRAMEWORK_ICONS_MAP = {
  react: ['lucide'],
  svelte: ['lucide'],
  next: ['lucide'],
};

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
		if (args[0] === `flush`) {
			const spinnerDb = ora(`flushing openv0 db`).start();
			const { stdout, stderr } = await execAsync(`cd server && node db flush`);
			// await sleep(1000);
			console.log(stdout);
			console.error(stderr);
			spinnerDb.succeed('done');
		} else if (args[0] === `component`) {
			// download component - update later when expanding to views
			// npx openv0 component @user/ComponentExample
			const spinnerDownload = ora(`download openv0 component : ${args[1]}`).start();
			const { stdout, stderr } = await execAsync(`cd server && node db download:component:${args[1]}`);
			// await sleep(1000);
			spinnerDownload.succeed('done');
			console.log(stdout);
			console.error(stderr);
		} else if (args[0] === `magic`) {
			// experimental features
			true
		}
  } else {
	// setup openv0
    const query = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'What framework to use?',
        choices: [
			{value: 'react', name: 'React'},
			{value: 'svelte', name: 'Svelte'},
			{value: 'next', name: 'Next (currently API only - no web dashboard)'},
		],
      },
      {
        type: 'list',
        name: 'components',
        message: 'What components library to use?',
        choices: (query) => FRAMEWORK_COMPONENTS_MAP[query.framework],
      },
      {
        type: 'list',
        name: 'icons',
        message: 'What icons library to use?',
        choices: (query) => FRAMEWORK_ICONS_MAP[query.framework],
      },
      {
        type: 'input',
        name: 'OPENAI_API_KEY',
        message: 'Paste your OpenAI API key (you can also edit it in .env later) : ',
		type: 'password',
		mask: '*',
      },
      {
        type: 'confirm',
        name: 'OPENV0__COLLECT_UIRAY',
        message: 'We are working on an open source vision model called ui-ray, '
					+ 'to make generative UI multimodal\n'
					+ '  Enable ui-ray debug logs to contribute ? (recommended) ',
      },
    ]);

		if (!process.env.OPENAI_API_KEY) {
			ENV.OPENAI_API_KEY = query.OPENAI_API_KEY.length ? query.OPENAI_API_KEY : "YOUR_OPENAI_KEY"
		}
		ENV.OPENV0__COLLECT_UIRAY = query.OPENV0__COLLECT_UIRAY ? 1 : 0

		// make dir
		try {
			fs.mkdirSync(`openv0`);
		} catch (err) {
			//if (err.code === 'EEXIST') console.log(`openv0 already exists in current directory.`);
			//else	console.log(error);
			//process.exit(1);
			true
		}




		// clone repo
		const spinnerGit = ora(`cloning ${GIT_REPO} in ${PROJECT_PATH}`).start();
		await execAsync(GIT_CLONE_CMD);
		spinnerGit.succeed('cloned repo');


		// duplicate target webapp-starters/{} to /webapp
		fs.mkdirSync( path.join( process.cwd() , `openv0/webapp` ) , { recursive: true });
		const sourceDir = path.join(process.cwd(), `openv0/webapps-starters/${query.framework}/${query.components}`);
		const destinationDir = path.join(process.cwd(), `openv0/webapp`);
		const spinnerWebappDir = ora(`creating openv0/webbapp from : openv0/webapps-starters/${query.framework}/${query.components}`).start();
		await fs.copy(sourceDir, destinationDir)
		spinnerWebappDir.succeed('created openv0/webbapp');

		// rm -rf clean
		const spinnerRm = ora(`cleaning files`).start();
		try{await fs.rm(path.join(PROJECT_PATH, ".git"), { recursive: true, force: true })}catch(e){false}
		try{await fs.rm(path.join(PROJECT_PATH, "bin"), { recursive: true, force: true })}catch(e){false}
		try{await fs.rm(path.join(process.cwd() , "openv0/webapps-starters"), { recursive: true, force: true })}catch(e){false}
		try{await fs.rm(path.join(process.cwd() , "openv0/npx"), { recursive: true, force: true })}catch(e){false}
		spinnerRm.succeed();


		// .env in server (try/catch)
		const spinnerEnv = ora(`creating openv0/server/.env`).start();
		await fs.writeFile(
			path.join( process.cwd() , `openv0/server/.env` ),
			Object.entries(ENV).map(([key, value]) => {
				return typeof value === 'string'
								? `${key} = "${value}"`
								: `${key} = ${value}`
			}).join('\n')
		)
		spinnerEnv.succeed();


		const spinner7z = ora(`extracting openv0/server/library/icons/lucide/vectordb/index.zip to index.json`).start();
		const zip = new AdmZip(
			path.join(process.cwd(), `openv0/server/library/icons/lucide/vectordb/index.zip`)
		);
		zip.extractAllTo(
			path.join(process.cwd(), `openv0/server/library/icons/lucide/vectordb`),
			true // overwrite
		)
		await fs.rm(path.join(process.cwd() , "openv0/server/library/icons/lucide/vectordb/index.zip"))
		spinner7z.succeed();


		process.chdir(PROJECT_PATH);
		// install server packages
		const spinnerServerNpmInstall = ora(`installing packages in openv0/server`).start();
		await execAsync(`cd server && npm i`);
		spinnerServerNpmInstall.succeed('done');

		// install webapp packages
		const spinnerWebappNpmInstall = ora(`installing packages in openv0/webapp`).start();
		await execAsync(`cd webapp && npm i`);
		spinnerWebappNpmInstall.succeed('done');


		console.log(`\n\nhow to use --------------------------------------------------------------`);
		console.log(`\t0. cd openv0`);
		console.log(`\t1. start server    : cd server && node api.js`);
		console.log(`\t2. start webapp    : cd webapp && npm run dev`);
		console.log(`\t3. start browser   : http://localhost:5173/`);
		console.log(`\n-------------------------------------------------------------------------`);

		console.log(`\n`);
		console.log(`* example : install a shared component ****************************************************`);
		console.log(`\n  $ cd openv0 && npx openv0 component @user/ComponentExample`);
		console.log(`\n* example : flush DB (warning : running this will delete DB; back up first) *************`);
		console.log(`\n  $ cd openv0 && npx openv0 flush`);
		console.log(`\n*****************************************************************************************`);

		console.log(`updates on openv0.com`);

  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error('Error:', error);
});
