import { execSync } from 'node:child_process';

import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { Git } from '../git.js';
import { _init } from './config/init.js';

export const init = Cmd('init')
	.description('initialize Git repo and Gw config')
	.action(() => {
		const isRepo = Git.isRepo();

		if (isRepo) {
			console.log(chalk.grey('Git repo is already initialized'));

			return;
		}

		execSync('git init', {
			stdio: 'pipe',
		});

		console.log(chalk.green('Git repo initialized'));

		_init();
	});
