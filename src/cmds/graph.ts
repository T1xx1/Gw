import chalk from 'chalk';

import { Cmd } from '../cmd.js';
import { Git } from '../git.js';
import { guard } from '../guard.js';

export const _graph = (options: { limit: `${number}` }): void => {
	guard.isRepo();

	const limit = parseInt(options.limit);

	if (limit < -1 || limit === 0) {
		console.log(chalk.redBright('`limit` must be -1 or greater than 0'));

		return;
	}

	if (limit === -1) {
		console.log(Git.getGraph());

		return;
	}

	console.log(Git.getGraph().split('\n').slice(0, limit).join('\n'));
};

export const graph = Cmd('graph')
	.description('print commits graph')
	.option('--limit [n]', 'limit', '30')
	.action(_graph);
