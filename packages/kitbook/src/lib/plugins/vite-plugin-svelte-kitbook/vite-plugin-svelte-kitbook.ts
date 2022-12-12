import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'fs';
// https://vitejs.dev/guide/api-plugin.html#simple-examples

export function kitbook(): Plugin {
  let config: ResolvedConfig;

  process.env.KITBOOK = '1';

  console.log('hello from kitbook plugin');
  if (!fs.existsSync('src/kitbook')) {
    console.log('kitbook folder does not exist so copy folder from node_modules/kitbook/routes to src/routes');
  }

  const svelteConfigPath = 'svelte.config.js';

  if (fs.existsSync(svelteConfigPath)) {
    const svelteConfigText = fs.readFileSync(svelteConfigPath, 'utf8');
    const isAugmented = svelteConfigText.includes('augmentSvelteConfigForKitbook');
    if (!isAugmented) {
      console.log('Augmenting your svelte.config.js file for Kitbook use. This `augmentSvelteConfigForKitbook` function will automatically add MDSvex support and update your routes folder to src/kitbook when running vite in "kitbook" mode.');
      const augmentFunction = `\nimport { augmentSvelteConfigForKitbook } from 'kitbook'; 
if (process.env.KITBOOK) { augmentSvelteConfigForKitbook(config); }\n`
      fs.writeFileSync(svelteConfigPath, svelteConfigText + augmentFunction);
    }
    
    const fakedAugment = svelteConfigText.includes('kleur');
    if (!fakedAugment) {
      console.log('writing in color')
      const augmentFunction = `\nimport { bold, cyan } from 'kleur/colors';
console.log(\`Starting $\{bold(cyan('Kitbook'))} dev server\`);\n`
      fs.writeFileSync(svelteConfigPath, svelteConfigText + augmentFunction);
    }
  }

  return {
    name: 'vite-plugin-svelte-kitbook',
    enforce: 'pre',

    config: (config, { mode }) => {
      if (mode === 'kitbook') {
        return {
          server: {
            port: 4321,
            fs: {
              allow: ['..'], // allow serving files from one level up to the project root for displaying README.md
            }
          }
        }
      }
    },

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    transform(src, id) {
      if (config.mode === 'kitbook') {
        if (id.includes('+page'))
          console.log(id)
        return {
          code: src,
        }
      }
    }
  }
}