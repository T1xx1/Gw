import { Cmd } from '../../cmd.js';

export const _set = (): void => {
	/* TODO */
};

export const set = Cmd('set')
	.description('set a value in the Gw config')
	.argument('<key>', 'key')
	.argument('<value>', 'value')
	.action(_set);
