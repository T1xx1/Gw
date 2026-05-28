import { Cmd } from '../../cmd.js';

export const remove = Cmd('remove')
	.alias('rm')
	.description('remove value from Gw config')
	.argument('<key>', 'key')
	.action(() => {
		/* TODO */
	});
