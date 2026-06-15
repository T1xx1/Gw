import chalk from 'chalk';

import { Cmd } from '../../cmd.js';
import { getConfig } from '../../config/_index.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';
import { styleBranch } from '../branch/_index.js';
import { _list } from '../worktree/list.js';

export const _information = (): void => {
	guard.isRepo();

	const config = getConfig();
	const currBranch = Git.branch.getCurr();
	const worktrees = Git.worktree.getAll();
	const branches = Object.keys(worktrees);
	const submoduleStatus = Git.submodule.getStatus();
	const repoName = worktrees[config.branches.mainBranch].split('/').at(-1)!;

	console.log(`${repoName} ⌥ ${styleBranch(currBranch, config.branches.mainBranch, currBranch)}`);

	/*  */

	console.log('\nSubmodules:');

	for (const line of submoduleStatus) {
		const [name, branch] = line.split('\n');

		console.log(`${chalk.blueBright(name)}${chalk.grey(`@${branch}`)}`);
	}

	/*  */

	console.log('\nWorktrees:');

	const longestBranch = Math.max(
		...branches.map((branch) => {
			return branch.length;
		}),
	);

	for (const branch of branches) {
		const styledBranch = styleBranch(branch, currBranch, currBranch);
		const spacing = ' '.repeat(longestBranch - branch.length);

		if (worktrees[branch]) {
			console.log(`${styledBranch}${spacing} ${worktrees[branch]}`);
		} else {
			console.log(styledBranch);
		}
	}
};

export const information = Cmd('information')
	.alias('info')
	.description('print information')
	.action(_information);
