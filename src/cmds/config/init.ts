import { existsSync, writeFileSync } from 'node:fs';

import chalk from 'chalk';
import { Command } from 'commander';

import { getConfigPath, initialConfig } from '../../config/_index.js';

export const _init = () => {
	const configPath = getConfigPath();

	if (existsSync(configPath)) {
		console.log(chalk.grey('Gw config is already initialized'));

		return;
	}

	writeFileSync(configPath, JSON.stringify(initialConfig, null, '\t'));

	console.log(chalk.green('Gw config initialized'));
};

export const init = new Command('init')
	.description('initialize Gw config')
	.helpCommand('help [command]', 'print help')
	.action(_init);
