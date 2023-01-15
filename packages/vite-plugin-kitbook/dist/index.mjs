import fs from 'fs';
import { defineMDSveXConfig, mdsvex } from 'mdsvex';
import { rehypeDisplayLinkTitles } from '@kitbook/rehype-display-link-titles';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeUrls from 'rehype-urls';
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash';

const MDSVEX_EXTENSIONS = [".md", ".svx"];
const AUGMENT_FUNCTION_TEXT = `import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
export default augmentSvelteConfigForKitbook(config)`;

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
      assets: "node_modules/kitbook/assets",
      routes: "node_modules/kitbook/routes"
    },
    outDir: ".svelte-kit-kitbook"
  }
};
function augmentSvelteConfigForKitbook(config, kitbookOptions = {}) {
  if (process.env.KITBOOK)
    return immutableDeepMerge(config, DEFAULT_KITBOOK_OPTIONS, kitbookOptions);
  return config;
}
function wrapExportedConfigWithAugmentFunction(svelteConfigText) {
  console.log(`Augmented your svelte.config.js file for Kitbook use. The 'augmentSvelteConfigForKitbook' function will add MDSvex support and use Kitbook's route files when running vite in "kitbook" mode.
`);
  return svelteConfigText.replace("export default config", AUGMENT_FUNCTION_TEXT);
}

function initKitbook() {
  process.env.KITBOOK = "yes";
  addKitbookDirectoryIfNeeded();
  addSvelteConfigAugmentFunctionIfNeeded();
}
function addKitbookDirectoryIfNeeded() {
  const KITBOOK_DIRECTORY = "src/.kitbook";
  if (!fs.existsSync(KITBOOK_DIRECTORY)) {
    try {
      fs.mkdirSync(KITBOOK_DIRECTORY);
      const src = "node_modules/kitbook/.kitbook";
      const destination = KITBOOK_DIRECTORY;
      fs.cpSync(src, destination, { recursive: true, filter: (src2, dest) => !src2.includes(".d.ts") });
      console.log(`Added Kitbook files to ${KITBOOK_DIRECTORY} which includes customization files for your Kitbook.
`);
    } catch (e) {
      console.error(e);
    }
  }
}
function addSvelteConfigAugmentFunctionIfNeeded() {
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
      fs.writeFileSync(svelteConfigPath, wrapExportedConfigWithAugmentFunction(svelteConfigText));
    }
  } else {
    console.log(`No svelte.config.{js|ts|mts|mjs|cts|cjs} file found. Make sure you have added the following to it to enable Kitbook: ${AUGMENT_FUNCTION_TEXT} 
`);
  }
}

const virtualImportModulesContent = `import { groupColocatedModulesIntoPages, pagesStore } from "kitbook";
const modules = import.meta.glob(["/src/**/*.{md,svx,svelte,variants.ts}", "/README.md"]);
const rawModules = import.meta.glob(["/src/**/*.{md,svx,svelte,variants.ts}", "/README.md"], { as: "raw" });
export const pages = groupColocatedModulesIntoPages(modules, rawModules);
const WrapRootLayoutMap = import.meta.glob(["/src/.kitbook/WrapRootLayout.svelte"], { eager: true, import: "default" });
export const WrapRootLayout = WrapRootLayoutMap["/src/.kitbook/WrapRootLayout.svelte"];
const init = import.meta.glob(["/src/.kitbook/init.{js,ts}"], { eager: true, import: "default" });
export const initFunction = init["/src/.kitbook/init.js"] || init["/src/.kitbook/init.ts"];
if (import.meta.hot) {
  import.meta.hot.accept((updatedModuleImport) => {
    if (updatedModuleImport?.pages) {
      pagesStore.set(updatedModuleImport.pages);
    }
  });
}`;

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

function modifyViteConfigForKitbook(userSpecifiedViteConfigAdjustments) {
  const kitbookDefaultViteAdjustments = {
    cacheDir: "node_modules/.vite-kitbook",
    server: {
      port: 4321,
      fs: {
        allow: [".."]
      }
    }
  };
  return immutableDeepMerge(kitbookDefaultViteAdjustments, userSpecifiedViteConfigAdjustments);
}

function kitbookPlugin({ userSpecifiedViteConfigAdjustments, mdsvexConfig } = {}) {
  const virtualImportModulesId = "virtual:kitbook-modules";
  const resolvedVirtualImportModulesId = "\0" + virtualImportModulesId;
  const isKitbookMode = process.env.npm_lifecycle_script?.includes("--mode kitbook");
  if (isKitbookMode)
    initKitbook();
  return {
    name: "vite-plugin-svelte-kitbook",
    enforce: "pre",
    apply(config, { mode }) {
      return mode === "kitbook";
    },
    config: (config, { mode }) => {
      if (mode === "kitbook")
        return modifyViteConfigForKitbook(userSpecifiedViteConfigAdjustments);
    },
    api: {
      sveltePreprocess: isKitbookMode && mdsvex(mdsvexConfig || config)
    },
    resolveId(id) {
      if (id === virtualImportModulesId) {
        return resolvedVirtualImportModulesId;
      }
    },
    load(id) {
      if (id === resolvedVirtualImportModulesId) {
        return virtualImportModulesContent;
      }
    }
  };
}

export { MDSVEX_EXTENSIONS, augmentSvelteConfigForKitbook, kitbookPlugin as kitbook };
