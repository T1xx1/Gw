import { chdir } from 'node:process';

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

	const worktrees = Git.getWorktrees();

	if (!worktrees[name]) {
		console.log(chalk.grey(`Branch '${name}' is not a worktree`));

		return;
	}

	chdir(worktrees[name]);

	console.log(chalk.green(`Checked out to worktree '${name}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout worktree')
	.argument('<name>', 'worktree name')
	.action(_checkout);
