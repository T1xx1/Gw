import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path/posix';

import { confirm } from '@clack/prompts';
import chalk from 'chalk';
import { Command } from 'commander';

import { getConfigPath } from '../config/_index.js';
import { Git } from '../git.js';

export const deinit = new Command('deinit')
	.description('deinitialize git repo and gw config')
	.helpCommand('help [command]', 'print help')
	.action(async () => {
		const isRepo = Git.isRepo();
		const gwConfigPath = getConfigPath();

		if (!isRepo && !gwConfigPath) {
			console.log(chalk.grey('No Git repo or gw config to deinitialize'));

			return;
		}

		if (
			!(await confirm({
				message: 'Are you sure you want to deinitialize the git repo and the gw config?',
			}))
		) {
			return;
		}

		if (gwConfigPath && existsSync(gwConfigPath)) {
			rmSync(gwConfigPath);

			console.log(chalk.green('Gw config deinitialized'));
		}

		if (isRepo) {
			rmSync(join(Git.getRoot()!, '.git'), {
				force: true,
				recursive: true,
			});

			console.log(chalk.green('Git repo deinitialized'));
		}
	});
