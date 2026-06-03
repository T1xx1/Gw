import { rmSync } from 'node:fs';
import { join } from 'node:path/posix';

import { confirm } from '@clack/prompts';
import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { Git } from '../git.js';
import { _deinit as _configDeinit } from './config/deinit.js';

export const _deinit = async () => {
	await _configDeinit();

	if (
		!(await confirm({
			message: 'Are you sure you want to deinitialize the Git repo?',
		}))
	) {
		return;
	}

	if (!Git.isRepo()) {
		console.log(chalk.grey('No Git repo to deinitialize'));

		return;
	}

	rmSync(join(Git.getCurrWorktreeRoot(), '.git'), {
		force: true,
		recursive: true,
	});

	console.log(chalk.green('Git repo deinitialized'));
};

export const deinit = Cmd('deinit')
	.description('deinitialize Git repo and Gw config')
	.action(_deinit);
