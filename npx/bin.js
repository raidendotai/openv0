#!/usr/bin/env node

/*
	not updated yet
*/

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ora = require('ora');

const git_repo = `https://github.com/raidendotai/openv0.git`;
const projectPath = path.join( process.cwd() , `openv0` );

try {
	fs.mkdirSync(`openv0`);
} catch (err) {
	if (err.code === 'EEXIST') {
		console.log(`openv0 already exists in current directory.`);
	} else {
		console.log(error);
	}
	process.exit(1);
}

async function main() {
	
	try {
		
		const gitSpinner = ora(`cloning ${git_repo} in ${projectPath}`).start();
		// clone the repo into the project folder -> creates the new boilerplate
		execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);
		gitSpinner.succeed();




		const cleanSpinner = ora(`cleaning files`).start();
		fs.rmSync(path.join(projectPath, ".git"), { recursive: true, force: true });
		fs.rmSync(path.join(projectPath, "bin"), { recursive: true, force: true });		
		cleanSpinner.succeed();

		process.chdir(projectPath);

		const serverSpinner = ora(`installing dependencies : server`).start();
		execSync('cd openv0_server && npm install');
		serverSpinner.succeed();

		const webappSpinner = ora(`installing dependencies : react+vite webapp`).start();
		execSync('cd openv0_vitereact && npm install');
		webappSpinner.succeed();

		console.log(`how to use -----------------------`);
		console.log(`\t0. cd openv0`);
		console.log(`\t1. put your openai api key in openv0_server/.env`);
		console.log(`\t2. start server    : cd openv0_server && node index.js`);
		console.log(`\t3. start webapp    : cd openv0_vitereact && npm run dev`);
		console.log(`\t4. start browser   : http://localhost:5173/`);

	} catch (error) {
		console.log(error);
	}
}

main();