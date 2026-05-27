import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

import chalk from 'chalk';
import { Command } from 'commander';

import { getConfigPath, initialConfig } from '../config/_index.js';
import { Git } from '../git.js';

export const init = new Command('init')
	.description('initialize git repo and gw config')
	.helpCommand('help [command]', 'print help')
	.action(() => {
		const isRepo = Git.isRepo();
		const gwConfigPath = getConfigPath();

		if (isRepo && gwConfigPath) {
			console.log(chalk.grey('Git repo and gw config are already initialized'));

			return;
		}

		if (isRepo) {
			console.log(chalk.grey('Git repo is already initialized'));
		} else {
			execSync('git init');

			console.log(chalk.green('Git repo initialized'));
		}

		if (!gwConfigPath) {
			console.log(chalk.grey('Gw config is already initialized'));
		} else {
			writeFileSync(gwConfigPath, JSON.stringify(initialConfig, null, '\t'));

			console.log(chalk.green('Gw config initialized'));
		}
	});
