import { confirm } from '@clack/prompts';
import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';

export const _deinit = async (): Promise<void> => {
	if (!Git.isRepo()) {
		console.log(chalk.grey('No Git repo to deinitialize'));

		return;
	}

	if (
		await confirm({
			message: 'Are you sure you want to deinitialize the Git repo?',
		})
	) {
		Git.deinit();

		console.log(chalk.green('Git repo deinitialized'));
	}
};

export const deinit = Cmd('deinit')
	.description('deinitialize Git repo and Gw config')
	.action(_deinit);
