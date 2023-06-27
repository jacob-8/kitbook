import type { Config } from '@sveltejs/kit';
import { AUGMENT_FUNCTION_TEXT, MDSVEX_EXTENSIONS } from './constants';
import { immutableDeepMerge } from './utils/immutableDeepMerge';
import { mdsvex } from 'mdsvex';
import DEFAULT_KITBOOK_MDSVEX_CONFIG from './mdsvex/mdsvex.config';
import { type MdsvexOptions } from 'mdsvex';

const DEFAULT_KITBOOK_OPTIONS: Config = {
  extensions: ['.svelte', ...MDSVEX_EXTENSIONS],
  kit: {
    files: {
      appTemplate: 'node_modules/kitbook/dist/app.html',
      assets: 'node_modules/kitbook/dist/assets',
      routes: 'src/.kitbook/routes',
    },
    outDir: '.svelte-kit-kitbook',
  }
}

/**
 * Takes your SvelteKit config and augments it with Kitbook-specific settings when running Kitbook, as well as exposing options to override the default Kitbook-specific settings.
 * @param {Config} [svelteConfig] - Passes your Svelte Config settings in so they can be merged with Kitbook's needed adjustments.
 * @param {Config} [options.svelteConfigAdjustments] - Adjust the Svelte Config even further beyond Kitbook's default adjustments when running Kitbook.
 * @param {MdsvexOptions} [options.mdsvexConfig] - Override the default Kitbook MdsvexConfig with your own.
*/
export function augmentSvelteConfigForKitbook(svelteConfig: Config, { svelteConfigAdjustments, mdsvexConfig }: { 
  svelteConfigAdjustments?: Config;
  mdsvexConfig?: MdsvexOptions;
} = {}) {
  if (process.env.KITBOOK) {
    const MDSVEX_PREPROCESSOR: Config = {
      preprocess: [
        mdsvex(mdsvexConfig || DEFAULT_KITBOOK_MDSVEX_CONFIG)
      ],
    }
    return immutableDeepMerge(MDSVEX_PREPROCESSOR, svelteConfig, DEFAULT_KITBOOK_OPTIONS, svelteConfigAdjustments);
  }

  return svelteConfig;
}

export function wrapExportedConfigWithAugmentFunction(svelteConfigText: string): string {
  console.log(`Augmented your svelte.config.js file for Kitbook use. The 'augmentSvelteConfigForKitbook' function will add MDSvex support and use Kitbook's route files when running vite in "kitbook" mode.\n`);
  return svelteConfigText.replace('export default config', AUGMENT_FUNCTION_TEXT);
}
