import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { getConfig } from '../config/_index.js';
import { Git } from '../git.js';
import { guard } from '../guard.js';
import { styleBranch } from './branch/_index.js';

export const _status = (): void => {
	guard.isRepo();

	const config = getConfig();
	const currBranch = Git.branch.getCurr();

	console.log(`⌥ ${styleBranch(currBranch, config.branches.mainBranch, currBranch)}\n`);

	const status = Git.getStatus();

	if (status === '') {
		console.log(chalk.grey('No changes'));

		return;
	}

	console.log(
		status
			.replaceAll('??', chalk.green('A'))
			.replaceAll('?? ', chalk.green('A'))
			.replaceAll(' A', chalk.green('A'))
			.replaceAll('A ', chalk.green('A'))
			.replaceAll(' M', chalk.yellow('M'))
			.replaceAll('M ', chalk.yellow('M'))
			.replaceAll(' D', chalk.red('D'))
			.replaceAll('D ', chalk.red('D')),
	);
};

export const status = Cmd('status').alias('s').description('print status').action(_status);
