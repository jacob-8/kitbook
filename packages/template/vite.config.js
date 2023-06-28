import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';

export default defineConfig({
	plugins: [
		kitbook(),
		sveltekit(),
	],
});
