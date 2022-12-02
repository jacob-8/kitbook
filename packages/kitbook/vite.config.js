import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
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
	},
};

export default config;

// How a custom Kitbook plugin can be created - see https://vitejs.dev/guide/api-plugin.html#simple-examples
// viteConfig.plugins.push(kitbook());

// function kitbook() {
//   return {
//     name: 'kitbook',

//     transform(src, id) {
//       // console.log(id)
//       return {
//         code: src,
//       }
//     }
//   }
// }
