import chalk from 'chalk';

import { Cmd } from '../../cmd.js';

import { checkout } from './checkout.js';
import { create } from './create.js';
import { delete_ } from './delete.js';
import { list } from './list.js';
import { rename } from './rename.js';

export const styleBranch = (branch: string, mainBranch: string, currBranch: string): string => {
	if (mainBranch === branch && currBranch === branch) {
		return chalk.blueBright(`~ ${branch}`);
	}

	if (mainBranch === branch) {
		return `* ${branch}`;
	}

	if (currBranch === branch) {
		return chalk.blueBright(`. ${branch}`);
	}

	return `  ${branch}`;
};

/*  */

export const branch = Cmd('branch')
	.alias('b')
	.description('...')
	.addCommand(checkout)
	.addCommand(create)
	.addCommand(delete_)
	.addCommand(list)
	.addCommand(rename);
