import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _close = (name: string): void => {
	guard.isRepo();
	Git.worktree.prune();
	guard.branchExists(name);

	const config = getConfig();

	if (name === config.branches.mainBranch) {
		console.log(chalk.redBright('The main worktree cannot be closed'));

		return;
	}

	const worktrees = Git.worktree.getAll();

	if (!worktrees[name]) {
		console.log(chalk.grey(`Branch '${name}' is not a worktree`));

		return;
	}

	Git.worktree.del(worktrees[name]);
	Git.worktree.prune();

	console.log(chalk.green(`Worktree '${name}' closed`));
};

export const close = Cmd('close')
	.description('close a worktree')
	.argument('<name>', 'worktree name')
	.action(_close);
