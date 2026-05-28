import { exit } from 'node:process';

import chalk from 'chalk';

export const panic = (duid: string): never => {
	console.log(chalk.magenta(`PANIC: ${duid}`));

	exit(1);
};
