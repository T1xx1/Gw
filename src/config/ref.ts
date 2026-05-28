import { z } from 'zod';

export const configValidator = z.object({
	/**
	 * JSON $schema
	 */
	$schema: z.url(),
	branches: z.object({
		/**
		 * Main branch
		 *
		 * @default 'main'
		 */
		mainBranch: z.string(),
	}),
	/**
	 * Worktrees
	 */
	worktrees: z.object({
		/**
		 * Relative directory to create new worktrees.
		 *
		 * @default '../'
		 */
		dir: z.string(),
	}),
});

export type Config = z.infer<typeof configValidator> & {
	[key: string]: any;
};

const partialConfigValidator = configValidator.partial();

export type PartialConfig = z.infer<typeof partialConfigValidator> & {
	[key: string]: any;
};

/* */

export const initialConfig: PartialConfig = {
	$schema: 'https://raw.githubusercontent.com/t1xx1/Gw/main/src/config/$schema.json',
	worktrees: {
		dir: '../',
	},
};

export const defaultConfig: Config = {
	$schema: 'https://raw.githubusercontent.com/t1xx1/Gw/main/src/config/$schema.json',
	branches: {
		mainBranch: 'main',
	},
	worktrees: {
		dir: '../',
	},
};
