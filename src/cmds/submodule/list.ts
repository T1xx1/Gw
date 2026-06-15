import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _list = () => {
	guard.isRepo();

	const status = Git.submodule.getStatus();

	if (status === '') {
		console.log(chalk.grey('No submodules'));

		return;
	}

	const parts = status.split('\n');

	for (let i = 0; i < parts.length; i = i + 2) {
		const name = parts[i];
		const branch = parts[i + 1];

		console.log(`${chalk.blueBright(name)}${chalk.grey(`@${branch}`)}`);
	}
};

export const list = Cmd('list').alias('ls').description('list submodules').action(_list);
