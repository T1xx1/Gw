import { z } from 'zod';

export const configValidator = z.object({
	/**
	 * JSON $schema
	 */
	$schema: z
		.url()
		.optional()
		.default('https://raw.githubusercontent.com/t1xx1/Gw/main/src/config/$schema.json'),
	branches: z
		.object({
			/**
			 * Main branch
			 *
			 * @default 'main'
			 */
			mainBranch: z.string().optional().default('main'),
		})
		.optional()
		.default({
			mainBranch: 'main',
		}),
	/**
	 * Worktrees
	 */
	worktrees: z
		.object({
			/**
			 * Relative directory to create new worktrees.
			 *
			 * @default '../'
			 */
			dir: z.string().optional().default('../'),
		})
		.optional()
		.default({
			dir: '../',
		}),
});

export type PartialConfig = {
	$schema?: string;
	branches?: {
		mainBranch?: string;
	};
	worktrees?: {
		dir?: string;
	};
};

export type Config = Required<PartialConfig> & {
	branches: Required<PartialConfig['branches']>;
	worktrees: Required<PartialConfig['worktrees']>;
};

/* */

export const initialConfig: PartialConfig = {
	$schema: 'https://raw.githubusercontent.com/t1xx1/Gw/main/src/config/$schema.json',
	branches: {
		mainBranch: 'main',
	},
	worktrees: {
		dir: '../',
	},
};
