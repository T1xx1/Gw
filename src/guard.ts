import { cwd, exit } from 'node:process';

import chalk from 'chalk';

export const guard = {
	isRepo: (isRepo: boolean) => {
		if (isRepo) {
			return;
		}

		console.log(chalk.redBright(`${cwd()} is not a Git repo`));

		exit(0);
	},
	branchExists: (branches: string[], name: string) => {
		if (branches.includes(name)) {
			return;
		}

		console.log(chalk.redBright(`Branch '${name}' does not exist`));

		exit(0);
	},
};
