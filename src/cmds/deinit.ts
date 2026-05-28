import { rmSync } from 'node:fs';
import { join } from 'node:path/posix';

import { confirm } from '@clack/prompts';
import chalk from 'chalk';
import { Command } from 'commander';

import { Git } from '../git.js';
import { _deinit } from './config/deinit.js';

export const deinit = new Command('deinit')
	.description('deinitialize Git repo and Gw config')
	.helpCommand('help [command]', 'print help')
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

		if (repoRoot) {
			rmSync(join(repoRoot, '.git'), {
				force: true,
				recursive: true,
			});

			console.log(chalk.green('Git repo deinitialized'));
		}
	});
