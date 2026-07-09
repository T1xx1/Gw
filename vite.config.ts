import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		ssr: true,
		minify: true,
		rollupOptions: {
			input: './src/_index.ts',
			output: {
				format: 'esm',
				codeSplitting: false,
				entryFileNames: 'bundle.js',
				comments: false,
			},
		},
	},
});
