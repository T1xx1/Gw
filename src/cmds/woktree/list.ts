import { Cmd } from '../../cmd.js';
import { Git } from '../../git.js';
import { guard } from '../../guard.js';
import { styleBranch } from '../branch/_index.js';

export const _list = () => {
	guard.isRepo(Git.isRepo());
	Git.pruneWorktrees();

	const currBranch = Git.getCurrBranch();
	const branches = Git.getBranches();
	const worktrees = Git.getWorktrees();

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

export const list = Cmd('list').alias('ls').description('list worktrees').action(_list);
