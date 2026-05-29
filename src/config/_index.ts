import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path/posix';

import { Git } from '../git.js';
import { process } from '../node.js';
import { defaultConfig, type Config, type PartialConfig } from './ref.js';

export const CONFIG_FILENAME = 'gw.config.json';

export const getConfigPath = (): string => {
	if (Git.isRepo()) {
		return join(Git.getRepoRoot(), CONFIG_FILENAME);
	}

	let currDir = process.cwd();

	while (true) {
		const candidate = join(currDir, CONFIG_FILENAME);

		if (existsSync(candidate)) {
			return join(candidate, CONFIG_FILENAME);
		}

		const parent = dirname(currDir);

		/* sys root */
		if (parent === currDir) {
			return join(currDir, CONFIG_FILENAME);
		}

		currDir = parent;
	}
};

export const getPartialConfig = (): PartialConfig => {
	const path = getConfigPath();

	if (!existsSync(path)) {
		return defaultConfig;
	}

	return JSON.parse(readFileSync(path, 'utf-8')) as PartialConfig;
};

export const getConfig = (): Config => {
	const partialConfig = getPartialConfig();

	return {
		...partialConfig,
		...defaultConfig,
		worktrees: {
			dir: partialConfig.worktrees?.dir ?? defaultConfig.worktrees.dir,
		},
	};
};

export * from './ref.js';
