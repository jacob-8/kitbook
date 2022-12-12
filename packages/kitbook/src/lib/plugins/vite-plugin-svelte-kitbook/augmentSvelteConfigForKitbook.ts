import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import { vitePreprocess } from '@sveltejs/kit/vite';

export function augmentSvelteConfigForKitbook(config) {
  config.extensions = ['.svelte', ...mdsvexConfig.extensions];
  config.preprocess = [vitePreprocess(), mdsvex(mdsvexConfig)];
  config.kit.files = {
    routes: 'src/kitbook'
  }
  config.kit.outDir = '.svelte-kit-kitbook'
}