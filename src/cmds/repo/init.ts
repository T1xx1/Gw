import { existsSync, writeFileSync } from 'node:fs';

import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfigPath, initialConfig } from '../../config/_index.js';
import { Git } from '../../git.js';

export const _init = (): void => {
	const configPath = getConfigPath();

	if (!existsSync(configPath)) {
		writeFileSync(configPath, JSON.stringify(initialConfig, null, '\t'));
	}

	if (Git.isRepo()) {
		console.log(chalk.grey('Git repo is already initialized'));
	} else {
		Git.init();

		console.log(chalk.green('Git repo initialized'));
	}

	Git.commitAll('Initial commit');
};

export const init = Cmd('init').description('initialize Git repo and Gw config').action(_init);
