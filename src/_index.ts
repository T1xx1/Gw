import chalk from 'chalk';
import { Command } from 'commander';

import { branch, config, deinit, information, init, version } from './cmds/_index.js';
import { getPackageJson } from './package.js';

const PACKAGE_JSON = getPackageJson();

const shell = new Command(PACKAGE_JSON.name)
	.version(PACKAGE_JSON.version, '--version, -v', 'print version')
	.helpOption('--help, -h', 'print help')
	.helpCommand('help [command]', 'print help')
	.configureOutput({
		outputError: (defaultError) => {
			const cmd = defaultError.split("'")[1];

			console.log(chalk.redBright(`'${cmd}' is not a command`));
		},
	});

shell.addCommand(version);
shell.addCommand(information);

/* */

shell.addCommand(branch).addCommand(config).addCommand(deinit).addCommand(init);

/* */

shell.parse();
