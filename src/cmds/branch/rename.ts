import { writeFileSync } from 'node:fs';

import chalk from 'chalk';

import { getConfig, getConfigPath, getPartialConfig } from '../../config/_index.js';
import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _rename = (name: string, newName: string): void => {
	guard.isRepo();
	guard.branchExists(name);

	if (name === newName) {
		console.log(chalk.redBright('The new name must be different than the previous'));

		return;
	}

	Git.renameBranch(name, newName);

	const configPath = getConfigPath();
	const partialConfig = getPartialConfig();
	const config = getConfig(partialConfig);

	if (name === config.branches.mainBranch) {
		if (!partialConfig.branches) {
			partialConfig.branches = {};
		}

		if (!partialConfig.branches.mainBranch) {
			partialConfig.branches.mainBranch = newName;
		}

		writeFileSync(configPath, JSON.stringify(partialConfig, null, '\t'));
	}

	console.log(chalk.green(`Branch '${name}' renamed to '${newName}'`));
};

export const rename = Cmd('rename')
	.alias('rn')
	.description('rename a branch')
	.argument('<name>', 'branch name')
	.argument('<newName>', 'new branch name')
	.action(_rename);
