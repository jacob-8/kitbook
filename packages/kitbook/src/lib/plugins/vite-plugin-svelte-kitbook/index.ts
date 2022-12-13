// Learn from https://vitejs.dev/guide/api-plugin.html#simple-examples
import type { Plugin, ResolvedConfig, UserConfig } from 'vite'
import fs from 'fs';

const viteConfigModications: UserConfig = {
  server: {
    port: 4321,
    fs: {
      allow: ['..'], // one level up from the project root for displaying README.md
    }
  }
}

export function kitbook(): Plugin {
  initKitbook();
  // let config: ResolvedConfig;

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    config: (config, { mode }) => {
      if (mode === 'kitbook') return viteConfigModications
    },

    // configResolved(resolvedConfig) {
    //   config = resolvedConfig
    // },

    // transform(src, id) {
    //   if (config.mode === 'kitbook') {
    //     if (id.includes('+page'))
    //       console.log(id)
    //     return {
    //       code: src,
    //     }
    //   }
    // }
  }
}

function initKitbook() {
  process.env.KITBOOK = '1';
  ensureKitbookRoutesExist();
  addSvelteConfigAugmentFunctionIfNeeded();
}

function ensureKitbookRoutesExist() {
  const kitbookRoutesPath = 'src/kitbook';
  if (!fs.existsSync(kitbookRoutesPath)) {
    try {
      fs.mkdirSync(kitbookRoutesPath);
      const src = 'node_modules/kitbook/routes';
      const destination = kitbookRoutesPath;
      fs.cpSync(src, destination, { recursive: true });
      console.log(`Copied Kitbook routes directory to ${kitbookRoutesPath} to setup your Kitbook. The Kitbook plugin will automatically update to your Svelte config file to use this as the routes directory when running vite in "kitbook" mode.`)
    } catch (e) {
      console.error(e);
    }
  }
}

function addSvelteConfigAugmentFunctionIfNeeded() {
  let svelteConfigPath: string;

  const possibleExtensions = ['js', 'mjs', 'cjs', 'ts'];
  for (const extension of possibleExtensions) {
    const path = `svelte.config.${extension}`;
    if (fs.existsSync(path))
      svelteConfigPath = path;
  }

  if (svelteConfigPath) {
    const svelteConfigText = fs.readFileSync(svelteConfigPath, 'utf8');
    const isAugmented = svelteConfigText.includes('augmentSvelteConfigForKitbook');
    if (!isAugmented) {
      console.log('Augmenting your svelte.config.js file for Kitbook use. This `augmentSvelteConfigForKitbook` function will automatically add MDSvex support and update your routes folder to src/kitbook when running vite in "kitbook" mode.');
      const augmentFunction = `\nimport { augmentSvelteConfigForKitbook } from 'kitbook'; 
if (process.env.KITBOOK) { augmentSvelteConfigForKitbook(config); }\n`
      fs.writeFileSync(svelteConfigPath, svelteConfigText + augmentFunction);
    }
  } else {
    console.log(`No svelte.config.js file found. Make sure you have added the following to it to enable Kitbook:
import { augmentSvelteConfigForKitbook } from 'kitbook'; 
if (process.env.KITBOOK) { augmentSvelteConfigForKitbook(config); }
    `);
  }
}