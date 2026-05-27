import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path/posix';

import { Git } from '../git.js';
import { defaultConfig, type Config, type PartialConfig } from './ref.js';

export const getConfigPath = (): null | string => {
	const root = Git.getRoot();

	if (!root) {
		return null;
	}

	return join(root, 'gw.config.json');
};

export const getConfig = (): Config => {
	const path = getConfigPath();

	if (!path || !existsSync(path)) {
		return defaultConfig;
	}

	const partialConfig = JSON.parse(readFileSync(path, 'utf-8')) as PartialConfig;

	return {
		worktrees: partialConfig.worktrees
			? {
					dir: partialConfig.worktrees?.dir ?? defaultConfig.worktrees.dir,
				}
			: defaultConfig.worktrees,
	};
};

export * from './ref.js';
