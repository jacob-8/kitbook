import type { Config } from '@sveltejs/kit';
import { MDSVEX_EXTENSIONS } from './constants';
import { immutableDeepMerge } from './utils/immutableDeepMerge';

const DEFAULT_KITBOOK_OPTIONS: Config = {
  extensions: ['.svelte', ...MDSVEX_EXTENSIONS],
  kit: {
    files: {
      appTemplate: 'node_modules/kitbook/app.html',
      assets: 'node_modules/kitbook/assets',
    },
  }
}

export function augmentSvelteConfigForKitbook(config: Config, {
  kitbookOptions
}: {
  kitbookOptions?: Config;
} = {}) {
  if (process.env.KITBOOK_ROUTES) {
    const routesFromPlugin: Config = {
      kit: {
        files: {
          routes: process.env.KITBOOK_ROUTES,
        },
      }
    }
    const isNotDefaultRoutesFolder = process.env.KITBOOK_ROUTES !== 'src/routes';
    if (isNotDefaultRoutesFolder) {
      routesFromPlugin.kit.outDir = '.svelte-kit-kitbook';
    }

    config = immutableDeepMerge(config, DEFAULT_KITBOOK_OPTIONS, kitbookOptions, routesFromPlugin);
  }
  return config;
}
