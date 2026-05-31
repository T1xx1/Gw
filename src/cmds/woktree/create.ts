import { join } from 'node:path/posix';

import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git, isRepoGuard } from '../../git.js';
import { getConfig } from '../../config/_index.js';

export const _create = (name: string) => {
	isRepoGuard();

	const branches = Git.getBranches();

	if (branches.includes(name)) {
		console.log(chalk.grey(`Branch '${name}' already exists`));
		console.log(chalk.grey(`Use '>gw worktree open ${name}' to checkout`));

		return;
	}

	const worktrees = Git.getWorktrees();

	if (worktrees[name]) {
		console.log(chalk.grey(`Worktree '${name}' already exists`));
		console.log(chalk.grey(`Use '>gw worktree checkout ${name}' to checkout`));

		return;
	}

	const config = getConfig();
	const mainWorktreeRoot = worktrees[config.branches.mainBranch];
	const repoName = mainWorktreeRoot.split('/').at(-1)!;

	Git.createBranch(name);
	Git.createWorktree(name, join(mainWorktreeRoot, config.worktrees.dir, `${repoName}-${name}`));

	console.log(chalk.green(`Worktree '${name}' opened`));
};

export const create = Cmd('create')
	.alias('add')
	.alias('a')
	.alias('new')
	.alias('n')
	.alias('+')
	.description('create a new worktree')
	.argument('<name>', 'name')
	.action(_create);
