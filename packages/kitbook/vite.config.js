import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		'import.meta.vitest': false,
	},
	build: {
		target: 'es2015' //es6
	},
	server: {
    fs: {
      // Allow serving files from one level up to the project root for displaying README.md in Kitbook
      allow: ['..']
			// can set via plugin config?
    }
  },
	test: {
		globals: true,
		includeSource: ['src/**/*.ts'],
	},
};

export default config;
