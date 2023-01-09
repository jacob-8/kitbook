import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, Plugin } from 'vite';
import { writeFileSync } from 'fs';
import Inspect from 'vite-plugin-inspect'

const config: UserConfig = {
	plugins: [Inspect(), extractStories(), sveltekit()],
	server: {
		fs: {
			allow: ['..'], // one level up from the project root for displaying README.md
		}
	},
};

export default config;


function extractStories(): Plugin {
	let prevStoriesPagesValues = 0; // needs to be a map of file to value

	return {
		name: 'extract-stories',
		enforce: 'pre',

		// transform stories pages to index stories
		transform(src, id) {
			// if stories page
			// if includes <Story
			// empty the Story body and return the replaced code (create source map with magicstring)
			// return {
			// 	code: src.replace(/<footer>.*?<\/footer>/g, ''),
			// }
		},

		async handleHotUpdate({ file, read, modules }) {
			// read updated file with stories and if the story interiors have changed (checking prevStoriesPagesValues) but not the file, then update just the story files in kitbook/stories/svelte, (update to using kitbook/routes and later we will use kitbook/) (writeFileSync and update the import paths) and return [] to avoid updating the stories page which would cause a reload of the iframes containing stories

			// will need to either preload main and sandbox pages to get stories extracted on build or will need to write a script to extract stories on build

			prevStoriesPagesValues++;
			console.log({ prevStoriesPagesValues });
			console.log({ file })

			if (file.includes('+page.svelte')) {
				const randomNumber = Math.random();
				writeFileSync('src/.kitbook/Hello.svelte', `<script>
				import { browser } from '$app/environment';
			</script>
			
			Hello: ${randomNumber}
			
			{#if browser}
				<div style="height: 200px; background: blue;" />
			{/if} `)
				return []
			}
		}
	}
}
