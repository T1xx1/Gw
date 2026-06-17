import packageJson from '../../package.json' with { type: 'json' };
import { Cmd } from '../cmd.js';

export const _version = (): void => {
	console.log(packageJson.version);
};

export const version = Cmd('version').alias('v').description('print version').action(_version);
