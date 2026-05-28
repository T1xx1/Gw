import { execSync } from 'node:child_process';

import { tryCatchSync } from '@t1xx1/tsfix';
import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { process } from '../../node.js';

export const _list = () => {
	if (!Git.isRepo()) {
		console.log(chalk.redBright(`${process.cwd()} is not a Git repo`));

		return;
	}

	const currBranch = Git.getCurrBranch();
	const config = getConfig();

	const { data, error } = tryCatchSync(() => {
		return execSync('git branch', {
			stdio: 'pipe',
		})
			.toString()
			.trimEnd()
			.split('\n')
			.map((line) => {
				return line.slice(2);
			});
	});

	if (error || data === null) {
		console.log(chalk.magenta('MPPD6WR9TK'));

		return;
	}

	if (data.length === 0) {
		console.log(chalk.grey('No branches'));

		return;
	}

	for (const branch of data) {
		if (currBranch === config.branches.mainBranch && currBranch === branch) {
			console.log(chalk.blueBright(`~ ${branch}`));

			continue;
		}

		if (config.branches.mainBranch === branch) {
			console.log(`* ${branch}`);

			continue;
		}

		if (currBranch === branch) {
			console.log(chalk.blueBright(`. ${branch}`));

			continue;
		}

		console.log(`  ${branch}`);
	}
};

export const list = Cmd('list').alias('ls').description('list branches').action(_list);
