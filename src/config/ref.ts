export type Config = {
	worktrees: {
		dir: string;
	};
};

export type PartialConfig = {
	worktrees?: Partial<Config['worktrees']>;
};

/* */

export const initialConfig: PartialConfig = {
	worktrees: {
		dir: '../',
	},
};

export const defaultConfig: Config = {
	worktrees: {
		dir: '../',
	},
};
