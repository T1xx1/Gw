import { rmSync } from 'node:fs';
import { join } from 'node:path/posix';

import { confirm } from '@clack/prompts';
import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { Git } from '../git.js';
import { _deinit } from './config/deinit.js';

export const deinit = Cmd('deinit')
	.description('deinitialize Git repo and Gw config')
	.action(async () => {
		await _deinit();

		if (
			!(await confirm({
				message: 'Are you sure you want to deinitialize the Git repo?',
			}))
		) {
			return;
		}

		const repoRoot = Git.getRepoRoot();

		if (!repoRoot) {
			console.log(chalk.grey('No Git repo to deinitialize'));

			return;
		}

		rmSync(join(repoRoot, '.git'), {
			force: true,
			recursive: true,
		});

		console.log(chalk.green('Git repo deinitialized'));
	});
