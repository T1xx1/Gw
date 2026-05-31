import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _delete = (name: string) => {
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

	Git.deleteWorktree(worktrees[name]);
	Git.pruneWorktrees();
	Git.deleteBranch(name);

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
