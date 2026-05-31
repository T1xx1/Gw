import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _checkout = (name: string) => {
	guard.isRepo();

	const branches = Git.getBranches();

	if (!branches.includes(name)) {
		console.log(chalk.redBright(`Branch '${name}' does not exist`));

		return;
	}

	Git.checkoutBranch(name);

	console.log(chalk.green(`Checked out to branch '${name}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout to a branch')
	.argument('<name>', 'branch name')
	.action(_checkout);
