import { rmSync, writeFileSync } from 'node:fs';

import chalk from 'chalk';
import { stringify } from 'ini';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _uninstall = (name: string): void => {
	guard.isRepo();
	guard.noChanges();

	const submodulesConfigPath = Git.submodule.getConfigPath();
	const submodulesConfig = Git.submodule.getConfig(submodulesConfigPath);

	guard.submoduleExists(name, submodulesConfig);

	const submodule = `submodule "${name}"`;
	const submoduleEntry = submodulesConfig[submodule];

	Git.submodule.deinit(submoduleEntry.path);

	rmSync(`.git/modules/submodules/${name}`, {
		recursive: true,
		force: true,
	});

	delete submodulesConfig[submodule];

	rmSync(submoduleEntry.path, {
		recursive: true,
		force: true,
	});

	writeFileSync(
		submodulesConfigPath,
		stringify(submodulesConfig)
			.replaceAll('path =', '\tpath =')
			.replaceAll('url =', '\turl =')
			.replaceAll('branch =', '\tbranch ='),
	);

	Git.stageAll();

	console.log(chalk.green(`Submodule ${name} uninstalled`));
};

export const uninstall = Cmd('uninstall')
	.alias('un')
	.alias('remove')
	.alias('rm')
	.description('uninstall a submodule')
	.argument('<name>', 'submodule')
	.action(_uninstall);
