import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _checkout = (name: string): void => {
	guard.isRepo();
	guard.branchExists(name);

	if (Git.getWorktreeBranches().includes(name)) {
		console.log(chalk.grey(`Branch '${name}' is a worktree`));
		console.log(chalk.grey(`Use >gw worktree checkout ${name} to checkout to the worktree`));

		return;
	}

	Git.branch.checkout(name);

	console.log(chalk.green(`Checked out to branch '${name}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout to a branch')
	.argument('<name>', 'branch name')
	.action(_checkout);
