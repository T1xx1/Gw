import { Cmd } from '../../cmd.js';

export const _set = () => {
	/* TODO */
};

export const set = Cmd('set')
	.description('set value in Gw config')
	.argument('<key>', 'key')
	.argument('<value>', 'value')
	.action(_set);
