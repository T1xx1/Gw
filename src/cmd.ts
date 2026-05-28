import { Command } from 'commander';

export const Cmd = (name?: string) => {
	return new Command(name)
		.helpOption('--help, -h', 'print help')
		.helpCommand('help [command]', 'print help');
};
