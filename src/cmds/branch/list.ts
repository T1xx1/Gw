import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';
import { styleBranch } from './_index.js';

export const _list = () => {
	guard.isRepo();

	const branches = Git.getBranches();

	if (branches.length === 0) {
		console.log(chalk.grey('No branches'));

		return;
	}

	const config = getConfig();
	const currBranch = Git.getCurrBranch();

	for (const branch of branches) {
		console.log(styleBranch(branch, config.branches.mainBranch, currBranch));
	}
};

export const list = Cmd('list').alias('ls').description('list branches').action(_list);
