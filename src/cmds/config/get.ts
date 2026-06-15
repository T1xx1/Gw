import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getPartialConfig } from '../../config/_index.js';

export const _get = (key: string): void => {
	const parts = key.split('.');

	let partialConfig: any = getPartialConfig();

	for (const part of parts) {
		if (!partialConfig[part]) {
			console.log(chalk.redBright(`'${key}' is not a valid key`));

			return;
		}

		partialConfig = partialConfig[part];
	}

	console.log(partialConfig);
};

export const get = Cmd('get')
	.description('get a value from the Gw config')
	.argument('<key>', 'key')
	.action(_get);
