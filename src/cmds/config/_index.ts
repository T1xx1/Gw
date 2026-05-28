import { Cmd } from '../../cmd.js';
import { deinit } from './deinit.js';
import { get } from './get.js';
import { init } from './init.js';
import { _print, print } from './print.js';
import { remove } from './remove.js';
import { set } from './set.js';

export const config = Cmd('config')
	.description('...')
	.action(_print)
	.addCommand(deinit)
	.addCommand(get)
	.addCommand(init)
	.addCommand(print)
	.addCommand(remove)
	.addCommand(set);
