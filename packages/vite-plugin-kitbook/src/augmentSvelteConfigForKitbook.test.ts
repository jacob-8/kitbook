import type { Config } from '@sveltejs/kit';
import { augmentSvelteConfigForKitbook, wrapExportedConfigWithAugmentFunction } from './augmentSvelteConfigForKitbook';
import type { PreprocessorGroup } from 'svelte/types/compiler/preprocess';

function vitePreprocess(opts?: any) {
  const vitePreprocessMock: PreprocessorGroup = {
    name: 'vitePreprocessMock',
    script: () => { code: '' },
  }
  return vitePreprocessMock;
}

// current svelte.config.js
const svelteConfig: Config = {
  preprocess: vitePreprocess(),
  kit: {
    files: {
      routes: 'src/bananas',
    },
    inlineStyleThreshold: 0,
  },
};

describe('augmentSvelteConfigForKitbook', () => {
  process.env.KITBOOK = 'yes';

  test('Mdsvex placed at front or preprocess array, then rank options from user, then kitbook defaults, then the current svelte.config.js', () => {
    const kitbookOptionsFromUser: Config = {
      kit: {
        files: {
          routes: 'src/shazambook',
        },
        version: null,
      },
    };

    expect(augmentSvelteConfigForKitbook(svelteConfig, { svelteConfigAdjustments: kitbookOptionsFromUser})).toMatchInlineSnapshot(`
      {
        "extensions": [
          ".svelte",
          ".md",
          ".svx",
        ],
        "kit": {
          "files": {
            "appTemplate": "node_modules/kitbook/dist/app.html",
            "assets": "node_modules/kitbook/dist/assets",
            "routes": "src/shazambook",
          },
          "inlineStyleThreshold": 0,
          "outDir": ".svelte-kit-kitbook",
          "version": null,
        },
        "preprocess": [
          {
            "markup": [Function],
            "name": "mdsvex",
          },
          {
            "name": "vitePreprocessMock",
            "script": [Function],
          },
        ],
      }
    `);
  });

  test('works without any adjustments from user', () => {
    expect(augmentSvelteConfigForKitbook(svelteConfig)).toMatchInlineSnapshot(`
      {
        "extensions": [
          ".svelte",
          ".md",
          ".svx",
        ],
        "kit": {
          "files": {
            "appTemplate": "node_modules/kitbook/dist/app.html",
            "assets": "node_modules/kitbook/dist/assets",
            "routes": "src/.kitbook/routes",
          },
          "inlineStyleThreshold": 0,
          "outDir": ".svelte-kit-kitbook",
        },
        "preprocess": [
          {
            "markup": [Function],
            "name": "mdsvex",
          },
          {
            "name": "vitePreprocessMock",
            "script": [Function],
          },
        ],
      }
    `);
  });

  test('works without any adjustments from user', () => {
    const svelteConfigWithPreprocessArray: Config = {
      preprocess: [vitePreprocess()],
    };
    expect(augmentSvelteConfigForKitbook(svelteConfig)).toMatchInlineSnapshot(`
      {
        "extensions": [
          ".svelte",
          ".md",
          ".svx",
        ],
        "kit": {
          "files": {
            "appTemplate": "node_modules/kitbook/dist/app.html",
            "assets": "node_modules/kitbook/dist/assets",
            "routes": "src/.kitbook/routes",
          },
          "inlineStyleThreshold": 0,
          "outDir": ".svelte-kit-kitbook",
        },
        "preprocess": [
          {
            "markup": [Function],
            "name": "mdsvex",
          },
          {
            "name": "vitePreprocessMock",
            "script": [Function],
          },
        ],
      }
    `);
  });
});

test('wrapExportedConfigWithAugmentFunction', () => {
  expect(wrapExportedConfigWithAugmentFunction(`import {foo} from 'somewhere';\n\nconst config = {}\n\nexport default config;`)).toMatchInlineSnapshot(`
    "import {foo} from 'somewhere';

    const config = {}

    import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
    export default augmentSvelteConfigForKitbook(config);"
  `);
});
