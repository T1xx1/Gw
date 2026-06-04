import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _rename = (name: string, newName: string) => {
	guard.isRepo(Git.isRepo());
	guard.branchExists(Git.getBranches(), name);

	Git.renameBranch(name, newName);

	console.log(chalk.green(`Branch '${name}' renamed to '${newName}'`));
};

export const rename = Cmd('rename')
	.alias('rn')
	.description('rename a branch')
	.argument('<name>', 'branch name')
	.argument('<newName>', 'new branch name')
	.action(_rename);
