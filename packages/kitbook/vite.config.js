import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from './src/lib/plugins/vite-plugin-svelte-kitbook/vite-plugin-svelte-kitbook';
import path from 'path';

const DEFAULT_VITEST_EXCLUDE = ['node_modules', 'dist', '.idea', '.git', '.cache'];

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		kitbook(),
		sveltekit(),
	],
	define: {
		'import.meta.vitest': false,
	},
	resolve: {
		alias: {
			'kitbook': path.resolve('./src/lib'),
		}
	},
	build: {
		target: 'es2015' //es6
	},
	test: {
		globals: true,
		includeSource: ['src/**/*.ts'],
		exclude: [...DEFAULT_VITEST_EXCLUDE, 'package'],
	},
};

export default config;
