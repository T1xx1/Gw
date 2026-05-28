import { Cmd } from '../../cmd.js';
import { getPartialConfig } from '../../config/_index.js';
import { deinit } from './deinit.js';
import { get } from './get.js';
import { init } from './init.js';
import { remove } from './remove.js';
import { set } from './set.js';

export const config = Cmd('config')
	.description('print Gw config')
	.action(() => {
		console.log(getPartialConfig());
	})
	.addCommand(deinit)
	.addCommand(get)
	.addCommand(init)
	.addCommand(remove)
	.addCommand(set);
