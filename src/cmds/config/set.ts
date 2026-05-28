import { Cmd } from '../../cmd.js';

export const set = Cmd('set')
	.description('set value in Gw config')
	.argument('<key>', 'key')
	.argument('<value>', 'value')
	.action(() => {
		/* TODO */
	});
