import { chdir } from 'node:process';

import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _checkout = (name: string): void => {
	guard.isRepo();
	Git.worktree.prune();
	guard.branchExists(name);

	const worktrees = Git.worktree.getAll();

	if (!worktrees[name]) {
		console.log(chalk.grey(`Branch '${name}' is not a worktree`));

		return;
	}

	chdir(worktrees[name]);

	console.log(chalk.green(`Checked out to worktree '${name}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout to a worktree')
	.argument('<name>', 'worktree name')
	.action(_checkout);
