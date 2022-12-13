import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite-plugin-svelte-kitbook';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		kitbook(),
		sveltekit(),
	],
};

export default config;
