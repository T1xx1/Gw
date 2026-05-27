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
					.trim() === 'true'
			);
		});

		if (error || !data) {
			return false;
		}

		return true;
	};

	export const getRoot = (): null | string => {
		const { data, error } = tryCatchSync(() => {
			return execSync('git rev-parse --show-toplevel', {
				stdio: 'pipe',
			})
				.toString()
				.trim();
		});

		if (error || !data) {
			return null;
		}

		return data;
	};
}
