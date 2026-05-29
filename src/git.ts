import { execSync } from 'node:child_process';
import { exit } from 'node:process';

import { tryCatchSync } from '@t1xx1/tsfix';
import chalk from 'chalk';

import { panic } from './panic.js';

const exec = (cmd: string, duid: string): string => {
	const { data, error } = tryCatchSync(() => {
		return execSync(cmd, {
			stdio: 'pipe',
		})
			.toString()
			.trimEnd();
	});

	if (error || data === null) {
		throw panic(duid);
	}

	return data;
};

export namespace Git {
	export const getVersion = (): string => {
		return exec('git -v', 'MPR0EM1AJ0').split(' ').at(-1)!;
	};

	/**
	 * @throws never
	 */
	export const isRepo = (): boolean => {
		const { data, error } = tryCatchSync(() => {
			return (
				execSync('git rev-parse --is-inside-work-tree', {
					stdio: 'pipe',
				})
					.toString()
					.trimEnd() === 'true'
			);
		});

		if (error || data === null) {
			return false;
		}

		return true;
	};

	export const init = (): void => {
		exec('git init', 'MPR0RFFAYO');
	};

	export const getRepoRoot = (): string => {
		return exec('git rev-parse --show-toplevel', 'MPRC29HLJI');
	};

	export const getCurrBranch = (): string => {
		return exec('git rev-parse --abbrev-ref HEAD', 'MPRBX7LBVW');
	};

	export const getBranches = (): string[] => {
		const data = exec('git branch --format="%(refname:short)"', 'MPPD6WR9TK');

		if (data === '') {
			return [];
		}

		return data.split('\n');
	};

	export const checkout = (branch: string): void => {
		exec(`git checkout ${branch}`, 'MPQ1H7USLF');
	};
}

export const isRepoGuard = (): void => {
	if (Git.isRepo()) {
		return;
	}

	console.log(chalk.redBright(`${process.cwd()} is not a Git repo`));

	exit(0);
};
