import { readFileSync } from 'node:fs';
import { join } from 'node:path/posix';

import { path } from './node.js';

export type PackageJson = {
	name: string;
	version: string;
	dependencies: {
		[packageName: string]: `^${string}`;
	};
};

export const getPackageJson = (): PackageJson => {
	return JSON.parse(
		readFileSync(join(path.normalizeSep(import.meta.dirname), '../package.json'), 'utf-8'),
	) as PackageJson;
};
