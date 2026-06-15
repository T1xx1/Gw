import { Cmd } from '../../cmd.js';
import { install } from './install.js';
import { list } from './list.js';
import { uninstall } from './uninstall.js';

export const submodule = Cmd('submodule')
	.alias('sm')
	.alias('subrepo')
	.alias('sr')
	.description('...')
	.addCommand(install)
	.addCommand(list)
	.addCommand(uninstall);
