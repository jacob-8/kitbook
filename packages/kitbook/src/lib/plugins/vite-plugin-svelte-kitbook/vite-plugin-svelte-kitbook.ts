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
  if (!fs.existsSync('src/kitbook')) {
    try {
      fs.mkdirSync('src/kitbook');
      const src = 'node_modules/kitbook/routes';
      const destination = 'src/kitbook';
      fs.cpSync(src, destination, { recursive: true });
      console.log('Copied Kitbook routes directory to src/kitbook to setup your Kitbook. The Kitbook plugin will automatically update to your svelte.config.js to use this as the routes directory when running vite in "kitbook" mode.')
    } catch (e) {
      console.error(e);
    }
  }
}

function addSvelteConfigAugmentFunctionIfNeeded() {
  const svelteConfigPath = 'svelte.config.js'; // TODO: detect other extensions (.mjs, .cjs, .ts)

  if (fs.existsSync(svelteConfigPath)) {
    const svelteConfigText = fs.readFileSync(svelteConfigPath, 'utf8');
    const isAugmented = svelteConfigText.includes('augmentSvelteConfigForKitbook');
    if (!isAugmented) {
      console.log('Augmenting your svelte.config.js file for Kitbook use. This `augmentSvelteConfigForKitbook` function will automatically add MDSvex support and update your routes folder to src/kitbook when running vite in "kitbook" mode.');
      const augmentFunction = `\nimport { augmentSvelteConfigForKitbook } from 'kitbook'; 
if (process.env.KITBOOK) { augmentSvelteConfigForKitbook(config); }\n`
      fs.writeFileSync(svelteConfigPath, svelteConfigText + augmentFunction);
    }
  }
}