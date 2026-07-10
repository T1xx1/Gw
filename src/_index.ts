import { join } from 'node:path';

import chalk from 'chalk';
import { Command } from 'commander';
import { config as dotenvConfig } from 'dotenv';

import packageJson from '../package.json' with { type: 'json' };
import {
	bindings,
	branch,
	config,
	graph,
	repo,
	stash,
	status,
	submodule,
	tag,
	version,
	worktree,
} from './cmds/_index.js';

dotenvConfig({
	override: true,
	path: join(import.meta.dirname, '..\\.env'),
	quiet: true,
});

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
	.addCommand(graph)
	.addCommand(repo)
	.addCommand(stash)
	.addCommand(status)
	.addCommand(submodule)
	.addCommand(tag)
	.addCommand(worktree);

/* */

shell.parse();
