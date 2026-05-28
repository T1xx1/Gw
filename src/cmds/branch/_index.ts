import { Cmd } from '../../cmd.js';

import { list } from './list.js';

export const branch = Cmd('branch').alias('b').description('...').addCommand(list);
