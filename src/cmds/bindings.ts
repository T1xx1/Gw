import chalk from 'chalk';

import packageJson from '../../package.json' with { type: 'json' };
import { Cmd } from '../cmd.js';
import { colors } from '../color.js';
import { Git } from '../git.js';

export const _bindings = (): void => {
	console.log(chalk.blueBright(`gw  ${packageJson.version}`));
	console.log(chalk.hex(colors.git)(`git ${Git.getVersion()}`));
};

export const bindings = Cmd('bindings')
	.alias('binds')
	.alias('i')
	.description('print bindings')
	.action(_bindings);
