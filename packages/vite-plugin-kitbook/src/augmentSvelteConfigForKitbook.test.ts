import type { Config } from '@sveltejs/kit';
import { augmentSvelteConfigForKitbook } from './augmentSvelteConfigForKitbook';

test('augmentSvelteConfigForKitbook first takes routes folder from Vite plugin, then options from user, then from kitbook defaults, then from the current svelte.config.js', () => {
  process.env.KITBOOK_ROUTES = 'src/set-in-vite-plugin';

  // from user
  const kitbookOptions: Config = {
    kit: {
      files: {
        routes: 'src/shazambook',
      },
      version: null,
    },
  };

  // kitbook defaults hardcoded into function

  // current svelte config (mock)
  const svelteConfig: Config = {
    kit: {
      files: {
        routes: 'src/bananas',
      },
      inlineStyleThreshold: 0,
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
            "appTemplate": "node_modules/kitbook/app.html",
            "assets": "node_modules/kitbook/assets",
            "routes": "src/set-in-vite-plugin",
          },
          "inlineStyleThreshold": 0,
          "outDir": ".svelte-kit-kitbook",
          "version": null,
        },
      }
    `);
});

test('when routes are reset in Vite plugin to src/routes, that remains regardless of what is inadvertently passed into augmentSvelteConfigForKitbook; also outDir is not changed from the kit default', () => {
  process.env.KITBOOK_ROUTES = 'src/routes';

  const kitbookOptions: Config = {
    kit: {
      files: {
        routes: 'src/shazambook',
      },
    },
  };

  const svelteConfig: Config = {
    kit: {
      files: {
        routes: 'src/bananas',
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
            "appTemplate": "node_modules/kitbook/app.html",
            "assets": "node_modules/kitbook/assets",
            "routes": "src/routes",
          },
        },
      }
    `);
});
