import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _create = (name: string) => {
	guard.isRepo();

	if (Git.getBranches().includes(name)) {
		console.log(chalk.grey(`Branch '${name}' already exists`));
		console.log(chalk.grey(`Use '>gw branch checkout ${name}' to checkout`));

		return;
	}

	Git.createBranch(name);

	console.log(chalk.green(`Branch '${name}' created`));
};

export const create = Cmd('create')
	.alias('c')
	.alias('add')
	.alias('a')
	.alias('new')
	.alias('n')
	.alias('+')
	.description('create a new branch')
	.argument('<name>', 'branch name')
	.action(_create);
