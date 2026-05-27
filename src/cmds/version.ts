import { Command } from 'commander';

import { getPackageJson } from '../package.js';

export const version = new Command('version')
	.alias('v')
	.description('print version')
	.action(() => {
		const packageJson = getPackageJson();

		console.log(packageJson.version);
	});
