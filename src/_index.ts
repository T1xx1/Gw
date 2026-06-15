import chalk from 'chalk';
import { Command } from 'commander';

import packageJson from '../package.json' with { type: 'json' };
import {
	bindings,
	branch,
	config,
	deinit,
	graph,
	information,
	init,
	status,
	submodule,
	version,
	worktree,
} from './cmds/_index.js';

const shell = new Command(packageJson.name)
	.version(packageJson.version, '--version, -v', 'print version')
	.helpOption('--help, -h', 'print help')
	.helpCommand('help [command]', 'print help')
	.configureOutput({
		outputError: (defaultError) => {
			const cmd = defaultError.split("'")[1];

			console.log(chalk.redBright(`'${cmd}' is not a command`));
		},
	});

shell.addCommand(version);
shell.addCommand(bindings);

/* */

shell
	.addCommand(branch)
	.addCommand(config)
	.addCommand(deinit)
	.addCommand(graph)
	.addCommand(information)
	.addCommand(init)
	.addCommand(status)
	.addCommand(submodule)
	.addCommand(worktree);

/* */

shell.parse();
