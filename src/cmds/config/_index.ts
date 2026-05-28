
import { Cmd } from '../../cmd.js';
import { deinit } from './deinit.js';
import { init } from './init.js';

export const config = Cmd('config')
	.description('manage Gw config')
	.addCommand(deinit)
	.addCommand(init);
