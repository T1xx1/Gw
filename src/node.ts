import { cwd as nodeCwd } from 'node:process';

export namespace path {
	export const SEP = '/';

	export const normalizeSep = (path: string): string => {
		return path.replaceAll('\\', SEP);
	};
}

export namespace process {
	export const cwd = (): string => {
		return path.normalizeSep(nodeCwd());
	};
}
