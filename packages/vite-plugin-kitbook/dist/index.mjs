import fs from 'fs';
import { defineMDSveXConfig, mdsvex } from 'mdsvex';
import { rehypeDisplayLinkTitles } from '@kitbook/rehype-display-link-titles';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeUrls from 'rehype-urls';
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash';

const DEFAULT_KITBOOK_ROUTES = "src/kitbook";
const MDSVEX_EXTENSIONS = [".md", ".svx"];

function initKitbook(routes) {
  process.env.KITBOOK_ROUTES = routes;
  ensureKitbookRoutesExist(routes);
  addSvelteConfigAugmentFunctionIfNeeded(routes);
}
function ensureKitbookRoutesExist(routes) {
  if (!fs.existsSync(routes)) {
    try {
      fs.mkdirSync(routes);
      const src = "node_modules/kitbook/routes";
      const destination = routes;
      fs.cpSync(src, destination, { recursive: true, filter: (src2, dest) => !src2.includes(".d.ts") });
      console.log(`Copied Kitbook routes directory to ${routes} to setup your Kitbook. The Kitbook plugin will automatically update your Svelte config file to use ${routes} as the routes directory when running vite in "kitbook" mode.
`);
    } catch (e) {
      console.error(e);
    }
  }
}
const AUGMENT_FUNCTION_TEXT = `import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
export default augmentSvelteConfigForKitbook(config);`;
function addSvelteConfigAugmentFunctionIfNeeded(routes) {
  let svelteConfigPath;
  const possibleExtensions = ["js", "mjs", "cjs", "ts", "mts", "cts"];
  for (const extension of possibleExtensions) {
    const pathToCheck = `svelte.config.${extension}`;
    if (fs.existsSync(pathToCheck))
      svelteConfigPath = pathToCheck;
  }
  if (svelteConfigPath) {
    const svelteConfigText = fs.readFileSync(svelteConfigPath, "utf8");
    const isAugmented = svelteConfigText.includes("augmentSvelteConfigForKitbook");
    if (!isAugmented) {
      fs.writeFileSync(svelteConfigPath, wrapExportedConfigWithAugmentFunction(svelteConfigText, routes));
    }
  } else {
    console.log(`No svelte.config.{js|ts|mts|mjs|cts|cjs} file found. Make sure you have added the following to it to enable Kitbook: ${AUGMENT_FUNCTION_TEXT} 
`);
  }
}
function wrapExportedConfigWithAugmentFunction(svelteConfigText, routes) {
  console.log(`Augmented your svelte.config.js file for Kitbook use. The 'augmentSvelteConfigForKitbook' function will add MDSvex support and serve routes from ${routes} when running vite in "kitbook" mode.
`);
  return svelteConfigText.replace("export default config", AUGMENT_FUNCTION_TEXT);
}
if (import.meta.vitest) {
  test("wrapExportedConfigWithAugmentFunction", () => {
    expect(wrapExportedConfigWithAugmentFunction(`import {foo} from 'somewhere';

const config = {}

export default config`, DEFAULT_KITBOOK_ROUTES)).toMatchInlineSnapshot(`
      "import {foo} from 'somewhere';

      const config = {}

      import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
      export default augmentSvelteConfigForKitbook(config);"
    `);
  });
}

const config = defineMDSveXConfig({
  extensions: MDSVEX_EXTENSIONS,
  remarkPlugins: [],
  rehypePlugins: [
    rehypeDisplayLinkTitles,
    [rehypeUrls, openExternalInNewTab],
    rehypeSlug,
    [rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        class: "heading-anchor"
      }
    }]
  ],
  highlight: shikiTwoslashHighlighter({ themes: ["dark-plus"] })
});
function openExternalInNewTab(url, node) {
  if (url.protocol?.startsWith("http")) {
    node.properties.target = "_blank";
    node.properties.rel = "noopener";
    node.properties.rel = "noreferrer";
  }
}

function kitbookPlugin({ routes, mdsvexConfig } = {}) {
  const routesDirectory = routes || DEFAULT_KITBOOK_ROUTES;
  const isKitbookMode = process.env.npm_lifecycle_script?.includes("--mode kitbook");
  if (isKitbookMode)
    initKitbook(routesDirectory);
  return {
    name: "vite-plugin-svelte-kitbook",
    enforce: "pre",
    config: (config, { mode }) => {
      if (mode === "kitbook")
        return kitbookModifications(config, routesDirectory);
    },
    api: {
      sveltePreprocess: isKitbookMode && mdsvex(mdsvexConfig || config)
    }
  };
}
function kitbookModifications(config, routesDirectory) {
  return {
    server: {
      port: config?.server?.port || 4321,
      fs: {
        allow: [".."]
      }
    },
    define: {
      __KitbookRoutes__: JSON.stringify(routesDirectory)
    }
  };
}

function immutableDeepMerge(...objects) {
  const initialObject = {};
  const isObject = (item) => item && typeof item === "object";
  return objects.reduce((previousObj, currentObj) => {
    if (currentObj === void 0)
      return previousObj;
    Object.keys(currentObj).forEach((key) => {
      const previousValue = previousObj[key];
      const currentValue = currentObj[key];
      if (Array.isArray(previousValue) && Array.isArray(currentValue)) {
        previousObj[key] = [.../* @__PURE__ */ new Set([...previousValue, ...currentValue])];
      } else if (isObject(previousValue) && isObject(currentValue)) {
        previousObj[key] = immutableDeepMerge(previousValue, currentValue);
      } else {
        previousObj[key] = currentValue;
      }
    });
    return previousObj;
  }, initialObject);
}

const DEFAULT_KITBOOK_OPTIONS = {
  extensions: [".svelte", ...MDSVEX_EXTENSIONS],
  kit: {
    files: {
      appTemplate: "node_modules/kitbook/app.html",
      assets: "node_modules/kitbook/assets"
    }
  }
};
function augmentSvelteConfigForKitbook(config, {
  kitbookOptions
} = {}) {
  if (process.env.KITBOOK_ROUTES) {
    const routesFromPlugin = {
      kit: {
        files: {
          routes: process.env.KITBOOK_ROUTES
        }
      }
    };
    const isNotDefaultRoutesFolder = process.env.KITBOOK_ROUTES !== "src/routes";
    if (isNotDefaultRoutesFolder) {
      routesFromPlugin.kit.outDir = ".svelte-kit-kitbook";
    }
    config = immutableDeepMerge(config, DEFAULT_KITBOOK_OPTIONS, kitbookOptions, routesFromPlugin);
  }
  return config;
}

export { MDSVEX_EXTENSIONS, augmentSvelteConfigForKitbook, kitbookPlugin as kitbook };
