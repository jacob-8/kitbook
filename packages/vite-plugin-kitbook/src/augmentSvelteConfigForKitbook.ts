import type { Config } from '@sveltejs/kit';
import { AUGMENT_FUNCTION_TEXT, MDSVEX_EXTENSIONS } from './constants';
import { immutableDeepMerge } from './utils/immutableDeepMerge';
import { mdsvex } from 'mdsvex';
import DEFAULT_KITBOOK_MDSVEX_CONFIG from './mdsvex/mdsvex.config';

const MDSVEX_PREPROCESSOR: Config = {
  preprocess: [
    mdsvex(DEFAULT_KITBOOK_MDSVEX_CONFIG)
  ],
}

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

export function augmentSvelteConfigForKitbook(config: Config, kitbookOptions: Config = {}) {
  if (process.env.KITBOOK)
    return immutableDeepMerge(MDSVEX_PREPROCESSOR, config, DEFAULT_KITBOOK_OPTIONS, kitbookOptions);

  return config;
}

export function wrapExportedConfigWithAugmentFunction(svelteConfigText: string): string {
  console.log(`Augmented your svelte.config.js file for Kitbook use. The 'augmentSvelteConfigForKitbook' function will add MDSvex support and use Kitbook's route files when running vite in "kitbook" mode.\n`);
  return svelteConfigText.replace('export default config', AUGMENT_FUNCTION_TEXT);
}