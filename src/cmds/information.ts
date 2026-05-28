import { execSync } from 'node:child_process';

import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { colors } from '../color.js';
import { getPackageJson } from '../package.js';

export const information = Cmd('information')
	.alias('info')
	.alias('i')
	.description('print information')
	.action(() => {
		const packageJson = getPackageJson();

		const gitVer = execSync('git -v').toString().split(' ').at(-1);

		const gwDeps = Object.entries(packageJson.dependencies)
			.map(([name, version]) => {
				return `${name} ${version.replace(/^\^/, '')}`;
			})
			.join('\n');

		console.log(chalk.blueBright(`${packageJson.name} ${packageJson.version}`));
		console.log(chalk.hex(colors.git)(`git ${gitVer}`));
		console.log('Dependencies:');
		console.log(gwDeps);
	});
