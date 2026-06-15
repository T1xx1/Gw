import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _list = (): void => {
	guard.isRepo();

	const status = Git.submodule.getStatus();

	if (status.length === 0) {
		console.log(chalk.grey('No submodules'));

		return;
	}

	for (const line of status) {
		const [name, branch] = line.split('\n');

		console.log(`${chalk.blueBright(name)}${chalk.grey(`@${branch}`)}`);
	}
};

export const list = Cmd('list').alias('ls').description('list submodules').action(_list);
