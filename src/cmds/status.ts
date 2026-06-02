import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { Git } from '../git.js';
import { guard } from '../guard.js';

export const _status = () => {
	guard.isRepo();

	const status = Git.getStatus();

	if (status === '') {
		console.log(chalk.grey('No changes'));

		return;
	}

	console.log(
		status
			.replaceAll('??', chalk.green('A'))
			.replaceAll(' M', chalk.yellow('M'))
			.replaceAll(' D', chalk.red('D')),
	);
};

export const status = Cmd('status').alias('s').description('print status').action(_status);
