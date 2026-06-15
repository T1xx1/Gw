import { writeFileSync } from 'node:fs';

import chalk from 'chalk';
import { stringify } from 'ini';
import z from 'zod';

import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';

export const _install = (url: string) => {
	guard.isRepo();

	if (!z.url().safeParse(url).success) {
		console.log(chalk.redBright(`'${url} is not a valid URL`));

		return;
	}

	guard.noChanges();

	const submodulesConfigPath = Git.submodule.getSubmodulesConfigPath();
	const submodulesConfig = Git.submodule.getSubmodulesConfig(submodulesConfigPath);
	const name = url.split('/').at(-1)!.split('.')[0];

	if (
		Object.values(submodulesConfig).find((entry) => {
			return entry.url === url;
		})
	) {
		console.log(chalk.grey(`Submodule '${name}' is already installed`));

		return;
	}

	const path = `submodules/${name}`;

	Git.submodule.add(url, path);

	submodulesConfig[`submodule "${name}"`] = {
		path,
		url,
	};

	writeFileSync(
		submodulesConfigPath,
		stringify(submodulesConfig, {
			whitespace: true,
		})
			.replaceAll('path =', '\tpath =')
			.replaceAll('url =', '\turl =')
			.replaceAll('branch =', '\tbranch ='),
	);

	Git.stageAll();

	console.log(chalk.green(`Submodule ${name} installed`));
};

export const install = Cmd('install')
	.alias('i')
	.alias('add')
	.alias('a')
	.description('install a submodule')
	.argument('<url>', 'submodule url')
	.action(_install);
