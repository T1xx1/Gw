import { exit } from 'node:process';

import chalk from 'chalk';

import { Git } from './git.js';

export const guard = {
	isRepo: () => {
		if (Git.isRepo()) {
			return;
		}

		console.log(chalk.redBright(`${process.cwd()} is not a Git repo`));

		exit(0);
	},
};
