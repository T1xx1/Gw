import { Cmd } from '../../cmd.js';
import { deinit } from './deinit.js';
import { information } from './information.js';
import { init } from './init.js';

export const repo = Cmd('repo')
	.description('...')
	.addCommand(deinit)
	.addCommand(init)
	.addCommand(information, {
		isDefault: true,
	});
