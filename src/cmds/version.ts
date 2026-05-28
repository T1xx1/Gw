import { Cmd } from '../cmd.js';
import { getPackageJson } from '../package.js';

export const version = Cmd('version')
	.alias('v')
	.description('print version')
	.action(() => {
		const packageJson = getPackageJson();

		console.log(packageJson.version);
	});
