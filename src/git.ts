import { execSync } from 'node:child_process';

import { tryCatchSync } from '@t1xx1/tsfix';

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

	export const getRepoRoot = (): string => {
		return exec('git rev-parse --show-toplevel', 'MPRC29HLJI');
	};

	/*  */

	export const getGraph = (): string => {
		return exec('git -c color.ui=always log --all --graph --decorate --oneline', 'MPR0EM1AJ0');
	};

	/*  */

	export const getCurrBranch = (): string => {
		return exec('git rev-parse --abbrev-ref HEAD', 'MPRBX7LBVW');
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

	export const getWorktreeBranches = () => {
		const chunks = exec('git worktree list --porcelain', 'MPPD6WR9TK').split('\n');

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
}
