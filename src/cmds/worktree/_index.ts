import { Cmd } from '../../cmd.js';

import { checkout } from './checkout.js';
import { close } from './close.js';
import { create } from './create.js';
import { delete_ } from './delete.js';
import { list } from './list.js';
import { open } from './open.js';

export const worktree = Cmd('worktree')
	.alias('wt')
	.description('...')
	.addCommand(checkout)
	.addCommand(close)
	.addCommand(create)
	.addCommand(delete_)
	.addCommand(list)
	.addCommand(open);
