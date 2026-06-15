import { Cmd } from '../../cmd.js';
import { deinit } from './deinit.js';
import { get } from './get.js';
import { init } from './init.js';
import { print } from './print.js';
import { remove } from './remove.js';
import { set } from './set.js';

export const config = Cmd('config')
	.description('...')
	.addCommand(deinit)
	.addCommand(get)
	.addCommand(init)
	.addCommand(print, {
		isDefault: true,
	})
	.addCommand(remove)
	.addCommand(set);
