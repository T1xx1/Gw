import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _delete = (name: string) => {
	guard.isRepo();

	const config = getConfig();

	if (name === config.branches.mainBranch) {
		console.log(chalk.redBright('The main branch cannot be deleted'));

		return;
	}

	guard.branchExists(name);

	if (Git.getWorktrees()[name]) {
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
