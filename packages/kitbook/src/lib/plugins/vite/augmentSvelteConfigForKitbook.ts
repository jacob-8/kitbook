import type { Config } from '@sveltejs/kit';
import { DEFAULT_KITBOOK_ROUTES } from './constants.js';
import defaultKitbookMdsvexConfig from './mdsvex/mdsvex.config.js';
import { immutableDeepMerge } from './utils/immutableDeepMerge.js';

const DEFAULT_KITBOOK_OPTIONS: Config = {
  extensions: ['.svelte', ...defaultKitbookMdsvexConfig.extensions],
  kit: {
    files: {
      appTemplate: 'node_modules/kitbook/app.html',
      routes: DEFAULT_KITBOOK_ROUTES,
      assets: 'node_modules/kitbook/assets',
    },
    outDir: '.svelte-kit-kitbook',
  }
}

export function augmentSvelteConfigForKitbook(config: Config, {
  kitbookOptions
}: {
  kitbookOptions?: Config;
} = {}) {
  if (process.env.KITBOOK_ROUTES) {
    const adjustedOptions = immutableDeepMerge(DEFAULT_KITBOOK_OPTIONS, kitbookOptions);
    config = immutableDeepMerge(config, adjustedOptions);
  }
  return config;
}

if (import.meta.vitest) {
  test('augmentSvelteConfigForKitbook takes options first from user, then from kitbook, then from base svelte.config.js', () => {
    process.env.KITBOOK_ROUTES = 'test';

    const svelteConfig: Config = {
      kit: {
        files: {
          routes: 'src/bananas',
        },
        inlineStyleThreshold: 0,
      },
    };

    const kitbookOptions: Config = {
      kit: {
        files: {
          routes: 'src/shazambook',
        },
      },
    };

    expect(augmentSvelteConfigForKitbook(svelteConfig, { kitbookOptions })).toMatchInlineSnapshot(`
      {
        "extensions": [
          ".svelte",
          ".md",
          ".svx",
        ],
        "kit": {
          "files": {
            "appTemplate": "node_modules/kitbook/kitbook-app.html",
            "routes": "src/shazambook",
          },
          "inlineStyleThreshold": 0,
          "outDir": ".svelte-kit-kitbook",
        },
      }
    `);
  });
}