import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path/posix';
import { env } from 'node:process';

import { tryCatchSync, type Result } from '@t1xx1/tsfix';
import chalk from 'chalk';
import { parse } from 'ini';

import { panic } from './panic.js';

const exec = (cmd: string): Result<string, Error> => {
	return tryCatchSync(() => {
		return execSync(cmd, {
			stdio: 'pipe',
		})
			.toString()
			.trimEnd();
	});
};
const execPanic = (cmd: string, duid: string): string => {
	const { data, error } = exec(cmd);

	if (env['ENV'] === 'dev' && error !== null) {
		console.log(chalk.magenta(error));
	}

	if (error || data === null) {
		throw panic(duid);
	}

	return data;
};

export namespace Git {
	export const getVersion = (): string => {
		return execPanic('git version', 'MPR0EM1AJ0').split(' ').at(-1)!;
	};

	/*  */

	export const isRepo = (): boolean => {
		const { data, error } = exec('git rev-parse --is-inside-work-tree');

		if (error || data === null) {
			return false;
		}

		return true;
	};

	export const getRoot = (): string => {
		return execPanic('git rev-parse --show-toplevel', 'MPRC29HLJI');
	};

	export const getGitPath = (): string => {
		return join(getRoot(), '.git');
	};

	/*  */

	export const init = (): void => {
		execPanic('git init', 'MPR0RFFAYO');
	};

	/*  */

	export const getStatus = (): string => {
		return execPanic('git status --porcelain', 'MPVR0YXKHK');
	};

	/*  */

	export const getGraph = (): string => {
		return execPanic('git -c color.ui=always log --all --graph --decorate --oneline', 'MPR0EM1AJ0');
	};

	export const stageAll = (): void => {
		execPanic('git add --all', 'MPR0EM1AJ0');
	};

	/*  */

	export namespace branch {
		export const getCurr = (): string => {
			return execPanic('git branch --show-current', 'MPRBX7LBVW');
		};

		export const getAll = (): string[] => {
			return execPanic('git branch --format="%(refname:short)"', 'MPPD6WR9TK').split('\n');
		};

		export const create = (name: string): void => {
			execPanic(`git branch ${name}`, 'MPRI2ZDOTD');
		};

		export const rename = (name: string, newName: string): void => {
			execPanic(`git branch -m ${name} ${newName}`, 'MPRI5XS8UB');
		};

		export const del = (name: string): void => {
			execPanic(`git branch -D ${name}`, 'MPRI5JFJF9');
		};

		export const checkout = (name: string): void => {
			execPanic(`git checkout ${name}`, 'MPQ1H7USLF');
		};
	}

	/*  */

	export namespace worktree {
		export const getBranches = () => {
			const chunks = execPanic('git worktree list --porcelain', 'MPPD6WR9TK').split('\n\n');

			return chunks.map((line) => {
				return line.split('\n')[2].split('/').at(-1)!;
			});
		};

		export const getAll = () => {
			const chunks = execPanic('git worktree list --porcelain', 'MPPD6WR9TK').split('\n\n');

			return Object.fromEntries(
				chunks.map((line) => {
					const lines = line.split('\n');

					return [lines[2].split('/').at(-1)!, lines[0].split(' ').at(-1)!];
				}),
			);
		};

		export const create = (name: string, path: string): void => {
			execPanic(`git worktree add ${path} ${name}`, 'MPRJMY1VZU');
		};

		export const del = (path: string): void => {
			execPanic(`git worktree remove --force ${path}`, 'MPTMRPSDDV');
		};

		export const prune = (): void => {
			execPanic('git worktree prune', 'MPTMSSVLWX');
		};
	}

	/*  */

	export namespace submodule {
		export const getConfigPath = (dir: string = getRoot()): string => {
			return join(dir, '.gitmodules');
		};

		export type Config = {
			[submodule: string]: {
				path: string;
				url: string;
				branch?: string;
			};
		};

		export const getConfig = (submodulesConfigPath: string = getConfigPath()): Config => {
			if (!existsSync(submodulesConfigPath)) {
				return {};
			}

			return parse(readFileSync(submodulesConfigPath, 'utf-8'));
		};

		/*  */

		export const getStatus = (): string[] => {
			return execPanic(
				'git submodule foreach --quiet "echo $name && git branch --show-current"',
				'MQC6N3XDML',
			).split('\n\n');
		};

		export const add = (url: string, path: string = '.'): void => {
			if (path === '.') {
				execPanic(`git submodule add -f ${url}`, 'MQE11E833S');
			} else {
				execPanic(`git submodule add -f ${url} ${path}`, 'MQC5MQHT4M');
			}
		};

		export const uninstall = (path: string): void => {
			execPanic(`git submodule deinit -f ${path}`, 'MQCQEMJUMH');
		};
	}
}
