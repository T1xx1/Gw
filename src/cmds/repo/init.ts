import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { _init as _configInit } from '../config/init.js';

export const _init = (): void => {
	if (Git.isRepo()) {
		console.log(chalk.grey('Git repo is already initialized'));
	} else {
		Git.init();

		console.log(chalk.green('Git repo initialized'));
	}

	_configInit();

	Git.commitAll('Initial commit');
};

export const init = Cmd('init').description('initialize Git repo and Gw config').action(_init);
