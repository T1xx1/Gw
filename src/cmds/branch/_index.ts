import { Cmd } from '../../cmd.js';

import { checkout } from './checkout.js';
import { list } from './list.js';

export const branch = Cmd('branch')
	.alias('b')
	.description('...')
	.addCommand(checkout)
	.addCommand(list);
