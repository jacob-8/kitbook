import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, Plugin } from 'vite';

const config: UserConfig = {
	plugins: [catchHMR(), sveltekit()],
	server: {
		fs: {
			allow: ['..'], // one level up from the project root for displaying README.md
		}
	},
};

export default config;

function catchHMR(): Plugin {
	return {
		name: 'catch-hmr',
		enforce: 'pre',

		handleHotUpdate({ server, file, modules }) {
			console.log({ file, modules })
			server.ws.send({
				type: 'custom',
				event: 'special-update',
				data: {
					foo: 'hello'
				}
			})
			return []
		}
	}
}