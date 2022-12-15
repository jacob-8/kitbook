import type { Config } from '@sveltejs/kit';
import type { MdsvexOptions } from 'mdsvex';
import defaultKitbookMdsvexConfig from './mdsvex.config.js';
import { immutableDeepMerge } from './utils/immutableDeepMerge.js';
import { appendMdsvexPreprocessor } from './appendMdsvexPreprocessor.js';

const DEFAULT_KITBOOK_OPTIONS: Config = {
  extensions: ['.svelte', ...defaultKitbookMdsvexConfig.extensions],
  kit: {
    files: {
      routes: 'src/kitbook',
      appTemplate: 'node_modules/kitbook/kitbook-app.html',
    },
    outDir: '.svelte-kit-kitbook',
  }
}

export function augmentSvelteConfigForKitbook(config: Config, {
  kitbookOptions,
  mdsvexConfig
}: {
  kitbookOptions?: Config;
  mdsvexConfig?: MdsvexOptions;
} = {}) {
  if (process.env.KITBOOK) {
    const adjustedOptions = immutableDeepMerge(DEFAULT_KITBOOK_OPTIONS, kitbookOptions);
    config = immutableDeepMerge(config, adjustedOptions);
    config.preprocess = appendMdsvexPreprocessor(config.preprocess, mdsvexConfig || defaultKitbookMdsvexConfig);
  }
  return config;
}

if (import.meta.vitest) {
  test('augmentSvelteConfigForKitbook takes options first from user, then from kitbook, then from base svelte.config.js', () => {
    expect(augmentSvelteConfigForKitbook({})).toMatchInlineSnapshot();
  });
}