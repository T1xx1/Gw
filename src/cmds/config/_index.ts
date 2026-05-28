import { Command } from 'commander';

import { deinit } from './deinit.js';
import { init } from './init.js';

export const config = new Command('config')
	.description('manage Gw config')
	.helpCommand('help [command]', 'print help')
	.addCommand(deinit)
	.addCommand(init);
