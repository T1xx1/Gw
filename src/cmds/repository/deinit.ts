import { rmSync } from 'node:fs';

import { confirm } from '@clack/prompts';
import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { _deinit as _configDeinit } from '../config/deinit.js';

export const _deinit = async (): Promise<void> => {
	if (!Git.isRepo()) {
		console.log(chalk.grey('No Git repo to deinitialize'));
	} else {
		if (
			await confirm({
				message: 'Are you sure you want to deinitialize the Git repo?',
			})
		) {
			rmSync(Git.getGitPath(), {
				force: true,
				recursive: true,
			});

			console.log(chalk.green('Git repo deinitialized'));
		}
	}

	await _configDeinit();
};

export const deinit = Cmd('deinit')
	.description('deinitialize Git repo and Gw config')
	.action(_deinit);
