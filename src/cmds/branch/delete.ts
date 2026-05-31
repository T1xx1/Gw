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

	if (worktrees[name]) {
		console.log(chalk.redBright(`Branch '${name}' is a worktree`));
		console.log(chalk.grey(`Use '>gw worktree delete ${name}' to delete the worktree`));

		return;
	}

	Git.deleteBranch(name);

	console.log(chalk.green(`Branch '${name}' deleted`));
};

export const delete_ = Cmd('delete')
	.alias('del')
	.alias('d')
	.alias('remove')
	.alias('rm')
	.alias('-')
	.description('delete a branch')
	.argument('<name>', 'branch name')
	.action(_delete);
