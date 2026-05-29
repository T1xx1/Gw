import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git, isRepoGuard } from '../../git.js';

export const _rename = (name: string, newName: string) => {
	isRepoGuard();

	const branches = Git.getBranches();

	if (!branches.includes(name)) {
		console.log(chalk.redBright(`Branch '${name}' does not exist`));

		return;
	}

	Git.renameBranch(name, newName);

	console.log(chalk.green(`Branch '${name}' renamed to '${newName}'`));
};

export const rename = Cmd('rename')
	.alias('rn')
	.description('rename a branch')
	.argument('<name>', 'branch name')
	.argument('<newName>', 'new branch name')
	.action(_rename);
