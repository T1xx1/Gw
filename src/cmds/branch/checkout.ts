import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git, isRepoGuard } from '../../git.js';

export const _checkout = (name: string) => {
	isRepoGuard();

	const branches = Git.getBranches();

	if (!branches.includes(name)) {
		console.log(chalk.redBright(`Branch '${name}' does not exist`));

		return;
	}

	Git.checkout(name);

	console.log(chalk.green(`Checked out to branch '${name}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout branch')
	.argument('<name>', 'branch name')
	.action(_checkout);
