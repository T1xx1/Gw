import { Cmd } from '../../cmd.js';

export const _remove = () => {
	/* TODO */
};

export const remove = Cmd('remove')
	.alias('rm')
	.description('remove a value from the Gw config')
	.argument('<key>', 'key')
	.action(_remove);
