import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		defaults: {
			sourceMap: true,
			style: 'postcss',
			script: 'typescript'
		},
		postcss: true,
	}),

	kit: {
		target: '#svelte',
		package: {
			files: {
				exclude: ['*.svench']
			}
		}
	}
};

export default config;
