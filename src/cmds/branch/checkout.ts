import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git, isRepoGuard } from '../../git.js';

export const _checkout = (branch: string) => {
	isRepoGuard();

	Git.checkout(branch);

	console.log(chalk.green(`Checked out to branch '${branch}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout branch')
	.argument('<branch>', 'branch')
	.action(_checkout);
