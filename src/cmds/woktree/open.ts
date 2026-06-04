import { join } from 'node:path/posix';

import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _open = (name: string) => {
	guard.isRepo(Git.isRepo());
	Git.pruneWorktrees();
	guard.branchExists(Git.getBranches(), name);

	const worktrees = Git.getWorktrees();

	if (worktrees[name]) {
		console.log(chalk.grey(`Worktree '${name}' already exists`));
		console.log(chalk.grey(`Use '>gw worktree checkout ${name}' to checkout`));

		return;
	}

	const config = getConfig();
	const mainWorktreeRoot = worktrees[config.branches.mainBranch];
	const repoName = mainWorktreeRoot.split('/').at(-1)!;

	Git.createWorktree(name, join(mainWorktreeRoot, config.worktrees.dir, `${repoName}-${name}`));

	console.log(chalk.green(`Worktree '${name}' opened`));
};

export const open = Cmd('open')
	.alias('o')
	.description('open a branch in a new worktree')
	.argument('<name>', 'branch name')
	.action(_open);
