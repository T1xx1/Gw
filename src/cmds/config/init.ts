import { existsSync, writeFileSync } from 'node:fs';

import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfigPath, initialConfig } from '../../config/_index.js';

export const _init = (): void => {
	const configPath = getConfigPath();

	if (existsSync(configPath)) {
		console.log(chalk.grey('Gw config is already initialized'));

		return;
	}

	writeFileSync(configPath, JSON.stringify(initialConfig, null, '\t'));

	console.log(chalk.green('Gw config initialized'));
};

export const init = Cmd('init').description('initialize Gw config').action(_init);
