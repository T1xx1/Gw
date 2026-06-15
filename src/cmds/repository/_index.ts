import { Cmd } from '../../cmd.js';
import { deinit } from './deinit.js';
import { information } from './information.js';
import { init } from './init.js';

export const repository = Cmd('repository')
	.alias('repo')
	.description('...')
	.addCommand(deinit)
	.addCommand(init)
	.addCommand(information, {
		isDefault: true,
	});
