import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _delete = (name: string): void => {
	guard.isRepo();
	Git.worktree.prune();

	const config = getConfig();

	if (name === config.branches.mainBranch) {
		console.log(chalk.redBright('The main worktree cannot be deleted'));

		return;
	}

	guard.branchExists(name);

	const worktrees = Git.worktree.getAll();

	if (!worktrees[name]) {
		console.log(chalk.grey(`Branch '${name}' is not a worktree`));

		return;
	}

	Git.worktree.del(worktrees[name]);
	Git.worktree.prune();
	Git.branch.del(name);

	console.log(chalk.green(`Worktree '${name}' deleted`));
};

export const delete_ = Cmd('delete')
	.alias('del')
	.alias('d')
	.alias('remove')
	.alias('rm')
	.alias('-')
	.description('delete a worktree')
	.argument('<name>', 'name')
	.action(_delete);
