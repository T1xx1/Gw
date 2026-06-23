import { join } from 'node:path/posix';
import { chdir } from 'node:process';

import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _create = (name: string): void => {
	guard.isRepo();
	Git.worktree.prune();

	const branches = Git.branch.getAll();

	if (branches.includes(name)) {
		console.log(chalk.grey(`Branch '${name}' already exists`));
		console.log(chalk.grey(`Use '>gw worktree open ${name}' to checkout`));

		return;
	}

	const worktrees = Git.worktree.getAll();

	if (worktrees[name]) {
		console.log(chalk.grey(`Worktree '${name}' already exists`));
		console.log(chalk.grey(`Use '>gw worktree checkout ${name}' to checkout`));

		return;
	}

	const config = getConfig();
	const mainWorktreeRoot = worktrees[config.branches.mainBranch];
	const repoName = mainWorktreeRoot.split('/').at(-1)!;
	const worktreeRoot = join(mainWorktreeRoot, config.worktrees.dir, `${repoName}-${name}`);

	Git.branch.create(name);
	Git.worktree.create(name, worktreeRoot);

	chdir(worktreeRoot);
	Git.submodule.init();

	console.log(chalk.green(`Worktree '${name}' created`));
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
