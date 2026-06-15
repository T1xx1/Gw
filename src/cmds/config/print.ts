import { Cmd } from '../../cmd.js';
import { getPartialConfig } from '../../config/_index.js';

export const _print = (): void => {
	console.log(getPartialConfig());
};

export const print = Cmd('print').alias('view').description('print the Gw config').action(_print);
