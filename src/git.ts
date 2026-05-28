import { execSync } from 'node:child_process';

import { tryCatchSync } from '@t1xx1/tsfix';

export namespace Git {
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

	export const getCurrBranch = (): string => {
		const { data, error } = tryCatchSync(() => {
			return execSync('git rev-parse --abbrev-ref HEAD', {
				stdio: 'pipe',
			})
				.toString()
				.trimEnd();
		});

		if (error || !data) {
			return '';
		}

		return data;
	};
}
