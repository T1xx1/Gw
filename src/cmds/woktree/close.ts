import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git, isRepoGuard } from '../../git.js';

export const _close = (name: string) => {
	isRepoGuard();

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

	Git.deleteWorktree(worktrees[name]);
	Git.pruneWorktrees();

	console.log(chalk.green(`Worktree '${name}' closed`));
};

export const close = Cmd('close')
	.description('close worktree')
	.argument('<name>', 'worktree name')
	.action(_close);
