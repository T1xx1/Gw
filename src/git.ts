import { execSync } from 'node:child_process';

import { tryCatchSync } from '@t1xx1/tsfix';

import { panic } from './panic.js';

export namespace Git {
	export const getVersion = (): string => {
		const { data, error } = tryCatchSync(() => {
			return execSync('git -v', {
				stdio: 'pipe',
			})
				.toString()
				.trimEnd()
				.split(' ')
				.at(-1);
		});

		if (error || !data) {
			throw panic('MPR0EM1AJ0');
		}

		return data;
	};

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

		if (error || !data) {
			return false;
		}

		return true;
	};

	export const init = (): void => {
		const { error } = tryCatchSync(() => {
			execSync('git init', {
				stdio: 'pipe',
			});
		});

		if (error) {
			throw panic('MPR0RFFAYO');
		}
	};

	export const getRepoRoot = (): null | string => {
		const { data, error } = tryCatchSync(() => {
			return execSync('git rev-parse --show-toplevel', {
				stdio: 'pipe',
			})
				.toString()
				.trimEnd();
		});

		if (error || !data) {
			return null;
		}

		return data;
	};

	export const getCurrBranch = (): null | string => {
		const { data, error } = tryCatchSync(() => {
			return execSync('git rev-parse --abbrev-ref HEAD', {
				stdio: 'pipe',
			})
				.toString()
				.trimEnd();
		});

		if (error || !data) {
			return null;
		}

		return data;
	};

	export const getBranches = (): string[] => {
		const { data, error } = tryCatchSync(() => {
			return execSync('git branch --format="%(refname:short)"', {
				stdio: 'pipe',
			})
				.toString()
				.trimEnd();
		});

		if (data === '') {
			return [];
		}

		if (error || !data) {
			throw panic('MPPD6WR9TK');
		}

		return data.split('\n');
	};

	export const checkout = (branch: string): void => {
		const { error } = tryCatchSync(() => {
			execSync(`git checkout ${branch}`, {
				stdio: 'pipe',
			});
		});

		if (error) {
			throw panic('MPQ1H7USLF');
		}
	};
}
