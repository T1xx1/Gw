import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _checkout = (branch: string) => {
	guard.isGitRepo();

	Git.checkout(branch);

	console.log(chalk.green(`Checked out to branch '${branch}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout branch')
	.argument('<branch>', 'branch')
	.action(_checkout);
