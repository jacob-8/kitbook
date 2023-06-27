import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from './src/lib/plugins/vite';
import path from 'path';

export default defineConfig({
	plugins: [
		kitbook({
			isKitbookItself: true,
			// fileGlobs: ['/src/docs/**/*.md', '/README.md']
		}),
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
});
