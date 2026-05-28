import { execSync } from 'node:child_process';

import { tryCatchSync } from '@t1xx1/tsfix';
import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { guard } from '../../guard.js';
import { panic } from '../../panic.js';

export const _checkout = (branch: string) => {
	guard.isGitRepo();

	const { error } = tryCatchSync(() => {
		execSync(`git checkout ${branch}`, {
			stdio: 'pipe',
		});
	});

	if (error) {
		throw panic('MPQ1H7USLF');
	}

	console.log(chalk.green(`Checkout out to branch '${branch}'`));
};

export const checkout = Cmd('checkout')
	.alias('co')
	.description('checkout branch')
	.argument('<branch>', 'branch')
	.action(_checkout);
