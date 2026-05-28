import { existsSync, rmSync } from 'node:fs';

import { confirm } from '@clack/prompts';
import chalk from 'chalk';
import { Command } from 'commander';

import { getConfigPath } from '../../config/_index.js';

export const _deinit = async () => {
	if (
		!(await confirm({
			message: 'Are you sure you want to deinitialize the Gw config?',
		}))
	) {
		return;
	}

	const configPath = getConfigPath();

	if (!existsSync(configPath)) {
		console.log(chalk.grey('No Gw config to deinitialize'));
	}

	rmSync(configPath, {
		force: true,
	});

	console.log(chalk.green('Gw config deinitialized'));
};

export const deinit = new Command('deinit')
	.description('deinitialize Gw config')
	.helpCommand('help [command]', 'print help')
	.action(_deinit);
