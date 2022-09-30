import { sveltekit } from '@sveltejs/kit/vite';

// keeps using localhost https://github.com/vitejs/vite/issues/9195
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		'import.meta.vitest': false,
	},
	build: {
		target: 'es2015' //es6
	},
	test: {
		globals: true,
		includeSource: ['src/**/*.ts'],
	},
};

export default config;
