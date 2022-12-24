import defaultKitbookMdsvexConfig from './mdsvex/mdsvex.config.js';
import { immutableDeepMerge } from './utils/immutableDeepMerge.js';
const DEFAULT_KITBOOK_OPTIONS = {
    extensions: ['.svelte', ...defaultKitbookMdsvexConfig.extensions],
    kit: {
        files: {
            appTemplate: 'node_modules/kitbook/app.html',
            assets: 'node_modules/kitbook/assets',
        },
    }
};
export function augmentSvelteConfigForKitbook(config, { kitbookOptions } = {}) {
    if (process.env.KITBOOK_ROUTES) {
        const routesFromPlugin = {
            kit: {
                files: {
                    routes: process.env.KITBOOK_ROUTES,
                },
            }
        };
        const isNotDefaultRoutesFolder = process.env.KITBOOK_ROUTES !== 'src/routes';
        if (isNotDefaultRoutesFolder) {
            routesFromPlugin.kit.outDir = '.svelte-kit-kitbook';
        }
        config = immutableDeepMerge(config, DEFAULT_KITBOOK_OPTIONS, kitbookOptions, routesFromPlugin);
    }
    return config;
}
if (import.meta.vitest) {
    test('augmentSvelteConfigForKitbook first takes routes folder from Vite plugin, then options from user, then from kitbook defaults, then from the current svelte.config.js', () => {
        process.env.KITBOOK_ROUTES = 'src/set-in-vite-plugin';
        // from user
        const kitbookOptions = {
            kit: {
                files: {
                    routes: 'src/shazambook',
                },
                version: null,
            },
        };
        // kitbook defaults hardcoded into function
        // current svelte config (mock)
        const svelteConfig = {
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
        const kitbookOptions = {
            kit: {
                files: {
                    routes: 'src/shazambook',
                },
            },
        };
        const svelteConfig = {
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
}
