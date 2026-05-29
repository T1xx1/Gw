import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { colors } from '../color.js';
import { Git } from '../git.js';
import { getPackageJson } from '../package.js';

export const _information = () => {
	const packageJson = getPackageJson();

	const gwDeps = Object.entries(packageJson.dependencies)
		.map(([name, version]) => {
			return `${name} ${version.replace(/^\^/, '')}`;
		})
		.join('\n');

	console.log(chalk.blueBright(`${packageJson.name} ${packageJson.version}`));
	console.log(chalk.hex(colors.git)(`git ${Git.getVersion()}`));
	console.log('\nDependencies:');
	console.log(gwDeps);
};

export const information = Cmd('information')
	.alias('info')
	.alias('i')
	.description('print information')
	.action(_information);
