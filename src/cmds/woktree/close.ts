import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _close = (name: string) => {
	guard.isRepo(Git.isRepo());
	Git.pruneWorktrees();
	guard.branchExists(Git.getBranches(), name);

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
	.description('close a worktree')
	.argument('<name>', 'worktree name')
	.action(_close);
