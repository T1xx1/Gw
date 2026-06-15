import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { tryCatchSync } from '@t1xx1/tsfix';
import { parse } from 'ini';

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

	/*  */

	export const getStatus = (): string => {
		return exec('git status --porcelain', 'MPVR0YXKHK');
	};

	/*  */

	export const getGraph = (): string => {
		return exec('git -c color.ui=always log --all --graph --decorate --oneline', 'MPR0EM1AJ0');
	};

	export const stageAll = (): void => {
		exec('git add --all', 'MPR0EM1AJ0');
	};

	/*  */

	export const getCurrBranch = (): string => {
		return exec('git branch --show-current', 'MPRBX7LBVW');
	};

	export const getBranches = (): string[] => {
		return exec('git branch --format="%(refname:short)"', 'MPPD6WR9TK').split('\n');
	};

	export const createBranch = (name: string): void => {
		exec(`git branch ${name}`, 'MPRI2ZDOTD');
	};

	export const renameBranch = (name: string, newName: string): void => {
		exec(`git branch -m ${name} ${newName}`, 'MPRI5XS8UB');
	};

	export const deleteBranch = (name: string): void => {
		exec(`git branch -D ${name}`, 'MPRI5JFJF9');
	};

	export const checkoutBranch = (name: string): void => {
		exec(`git checkout ${name}`, 'MPQ1H7USLF');
	};

	/*  */

	export const getCurrWorktreeRoot = (): string => {
		return exec('git rev-parse --show-toplevel', 'MPRC29HLJI');
	};

	export const getWorktreeBranches = () => {
		const chunks = exec('git worktree list --porcelain', 'MPPD6WR9TK').split('\n\n');

		return chunks.map((line) => {
			return line.split('\n')[2].split('/').at(-1)!;
		});
	};

	export const getWorktrees = () => {
		const chunks = exec('git worktree list --porcelain', 'MPPD6WR9TK').split('\n\n');

		return Object.fromEntries(
			chunks.map((line) => {
				const lines = line.split('\n');

				return [lines[2].split('/').at(-1)!, lines[0].split(' ').at(-1)!];
			}),
		);
	};

	export const pruneWorktrees = (): void => {
		exec('git worktree prune', 'MPTMSSVLWX');
	};

	export const createWorktree = (name: string, path: string): void => {
		exec(`git worktree add ${path} ${name}`, 'MPRJMY1VZU');
	};

	export const deleteWorktree = (path: string): void => {
		exec(`git worktree remove --force ${path}`, 'MPTMRPSDDV');
	};

	/*  */

	export namespace submodule {
		export const getSubmodulesConfigPath = (dir: string = getCurrWorktreeRoot()): string => {
			return join(dir, '.gitmodules');
		};

		export type Config = {
			[submodule: string]: {
				path: string;
				url: string;
				branch?: string;
			};
		};

		export const getSubmodulesConfig = (
			submodulesConfigPath: string = getSubmodulesConfigPath(),
		): Config => {
			if (!existsSync(submodulesConfigPath)) {
				return {};
			}

			return parse(readFileSync(submodulesConfigPath, 'utf-8'));
		};

		/*  */

		export const getStatus = (): string => {
			return exec(
				'git submodule foreach --quiet "echo $name && git branch --show-current"',
				'MQC6N3XDML',
			);
		};

		export const add = (url: string, path: string = '.'): void => {
			if (path === '.') {
				exec(`git submodule add -f ${url}`, 'MQE11E833S');
			} else {
				exec(`git submodule add -f ${url} ${path}`, 'MQC5MQHT4M');
			}
		};

		export const deinit = (path: string): void => {
			exec(`git submodule deinit -f ${path}`, 'MQCQEMJUMH');
		};
	}
}
