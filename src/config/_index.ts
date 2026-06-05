import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path/posix';
import { exit } from 'node:process';

import { tryCatchSync } from '@t1xx1/tsfix';
import chalk from 'chalk';

import { Git } from '../git.js';
import { process } from '../node.js';
import { configValidator, type Config, type PartialConfig } from './ref.js';

export const CONFIG_FILENAME = 'gw.config.json';

export const getConfigPath = (): string => {
	if (Git.isRepo()) {
		return join(Git.getCurrWorktreeRoot(), CONFIG_FILENAME);
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

export const getPartialConfig = (configPath: string = getConfigPath()): PartialConfig => {
	const { data, error } = tryCatchSync(() => {
		if (!existsSync(configPath)) {
			return {};
		}

		return JSON.parse(readFileSync(configPath, 'utf-8')) as PartialConfig;
	});

	const validation = configValidator.safeParse(data);

	if (error || data === null || !validation.success) {
		console.log(chalk.redBright('Cannot parse Gw config'));

		exit(1);
	}

	return data;
};

export const getConfig = (partialConfig: PartialConfig = getPartialConfig()): Config => {
	return configValidator.safeParse(partialConfig).data as Config;
};

export * from './ref.js';
