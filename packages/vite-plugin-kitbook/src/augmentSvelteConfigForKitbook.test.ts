import type { Config } from '@sveltejs/kit';
import { augmentSvelteConfigForKitbook, wrapExportedConfigWithAugmentFunction } from './augmentSvelteConfigForKitbook';

// current svelte.config.js
const svelteConfig: Config = {
  kit: {
    files: {
      routes: 'src/bananas',
    },
    inlineStyleThreshold: 0,
  },
};

test('augmentSvelteConfigForKitbook first takes options from user, then from kitbook defaults, then from the current svelte.config.js', () => {
  process.env.KITBOOK = 'yes';

  const kitbookOptionsFromUser: Config = {
    kit: {
      files: {
        routes: 'src/shazambook',
      },
      version: null,
    },
  };


  expect(augmentSvelteConfigForKitbook(svelteConfig, kitbookOptionsFromUser)).toMatchInlineSnapshot(`
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
            "routes": "src/shazambook",
          },
          "inlineStyleThreshold": 0,
          "outDir": ".svelte-kit-kitbook",
          "version": null,
        },
      }
    `);
});

test('augmentSvelteConfigForKitbook updates extensions and files locations', () => {
  expect(augmentSvelteConfigForKitbook(svelteConfig)).toMatchInlineSnapshot(`
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
          "routes": "node_modules/kitbook/routes",
        },
        "inlineStyleThreshold": 0,
        "outDir": ".svelte-kit-kitbook",
      },
    }
  `);
});

test('wrapExportedConfigWithAugmentFunction', () => {
  expect(wrapExportedConfigWithAugmentFunction(`import {foo} from 'somewhere';\n\nconst config = {}\n\nexport default config;`)).toMatchInlineSnapshot(`
      "import {foo} from 'somewhere';

      const config = {}

      import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
      export default augmentSvelteConfigForKitbook(config);"
    `);
});