import { Cmd } from '../../cmd.js';

export const _remove = () => {
	/* TODO */
};

export const remove = Cmd('remove')
	.alias('rm')
	.description('remove a value from Gw config')
	.argument('<key>', 'key')
	.action(_remove);
