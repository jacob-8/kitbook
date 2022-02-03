import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		defaults: {
			sourceMap: true,
			style: 'postcss',
		},
		postcss: true,
	}),

	disableDependencyReinclusion: ['svench'],
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
