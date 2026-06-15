import { cwd, exit } from 'node:process';

import chalk from 'chalk';

import { Git } from './git.js';

export const guard = {
	isRepo: (isRepo: boolean = Git.isRepo()) => {
		if (isRepo) {
			return;
		}

		console.log(chalk.redBright(`${cwd()} is not a Git repo`));

		exit(0);
	},
	noChanges: (status: string = Git.getStatus()) => {
		if (status === '') {
			return;
		}

		console.log(chalk.redBright("Can't install/uninstall submodules with uncommitted changes"));

		exit(0);
	},
	branchExists: (name: string, branches: string[] = Git.getBranches()) => {
		if (branches.includes(name)) {
			return;
		}

		console.log(chalk.redBright(`Branch '${name}' does not exist`));

		exit(0);
	},
	submoduleExists: (name: string, submodulesConfig: Git.submodule.Config) => {
		if (`submodule "${name}"` in submodulesConfig) {
			return;
		}

		console.log(chalk.redBright(`Submodule '${name}' does not exist`));

		exit(0);
	},
};
