import { Cmd } from '../../cmd.js';
import { getPartialConfig } from '../../config/_index.js';

export const _print = () => {
	console.log(getPartialConfig());
};

export const print = Cmd('print').alias('view').description('print Gw config').action(_print);
