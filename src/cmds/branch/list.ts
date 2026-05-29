import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _list = () => {
	guard.isGitRepo();

	const config = getConfig();
	const currBranch = Git.getCurrBranch();
	const branches = Git.getBranches();

	if (branches.length === 0) {
		console.log(chalk.grey('No branches'));

		return;
	}

	for (const branch of branches) {
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
