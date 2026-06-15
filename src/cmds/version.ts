import { Cmd } from '../cmd.js';
import { getPackageJson } from '../package.js';

export const _version = (): void => {
	const packageJson = getPackageJson();

	console.log(packageJson.version);
};

export const version = Cmd('version').alias('v').description('print version').action(_version);
