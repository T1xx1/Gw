import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git, isRepoGuard } from '../../git.js';

export const _checkout = (branch: string) => {
	isRepoGuard();

	const branches = Git.getBranches();

	if (!branches.includes(branch)) {
		console.log(chalk.redBright(`Branch '${branch}' does not exist`));

		return;
	}

	Git.checkout(branch);

	console.log(chalk.green(`Checked out to branch '${branch}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout branch')
	.argument('<branch>', 'branch')
	.action(_checkout);
