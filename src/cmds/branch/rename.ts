import { writeFileSync } from 'node:fs';

import chalk from 'chalk';

import { getConfig, getConfigPath, getPartialConfig } from '../../config/_index.js';
import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _rename = (name: string, newName: string) => {
	guard.isRepo(Git.isRepo());
	guard.branchExists(Git.getBranches(), name);

	if (name === newName) {
		console.log(chalk.redBright('The new name must be different than the previous'));

		return;
	}

	Git.renameBranch(name, newName);

	const config = getConfig();

	if (name === config.branches.mainBranch) {
		const partialConfig = getPartialConfig();

		if (!partialConfig.branches) {
			partialConfig.branches = {};
		}

		if (!partialConfig.branches.mainBranch) {
			partialConfig.branches.mainBranch = newName;
		}

		writeFileSync(getConfigPath(), JSON.stringify(partialConfig, null, '\t'));
	}

	console.log(chalk.green(`Branch '${name}' renamed to '${newName}'`));
};

export const rename = Cmd('rename')
	.alias('rn')
	.description('rename a branch')
	.argument('<name>', 'branch name')
	.argument('<newName>', 'new branch name')
	.action(_rename);
