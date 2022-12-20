import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from './src/lib/plugins/vite';
import path from 'path';
import { configDefaults } from 'vitest/config'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		kitbook({ routes: 'src/lib/routes' }),
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
		exclude: [...configDefaults.exclude, 'package'],
	},
};

export default config;
