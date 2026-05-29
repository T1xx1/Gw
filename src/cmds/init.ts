import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { Git } from '../git.js';
import { _init as _configInit } from './config/init.js';

export const _init = () => {
	const isRepo = Git.isRepo();

	if (isRepo) {
		console.log(chalk.grey('Git repo is already initialized'));

		return;
	}

	Git.init();

	console.log(chalk.green('Git repo initialized'));

	_configInit();
};

export const init = Cmd('init').description('initialize Git repo and Gw config').action(_init);
