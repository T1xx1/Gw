import { execSync } from 'node:child_process';

import chalk from 'chalk';
import { Command } from 'commander';

import { Git } from '../git.js';
import { _init } from './config/init.js';

export const init = new Command('init')
	.description('initialize Git repo and Gw config')
	.helpCommand('help [command]', 'print help')
	.action(() => {
		const isRepo = Git.isRepo();

		if (isRepo) {
			console.log(chalk.grey('Git repo is already initialized'));

			return;
		}

		execSync('git init');

		console.log(chalk.green('Git repo initialized'));

		_init();
	});
