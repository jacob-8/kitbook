import path from 'node:path'
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
// import { kitbook } from './src/lib/plugins/vite'
// import kitbookConfig from './kitbook.config'
import type { Plugin } from 'vite'

export default defineConfig({
  plugins: [
    // kitbook(kitbookConfig),
    sveltekit(),
  ],
  // define: {
  //   'import.meta.vitest': false,
  // },
  // server: {
  //   port: 3212,
  //   strictPort: true,
  // },
  // build: {
  //   target: 'es2015', // es6
  // },
})

// from: https://github.com/antfu/nuxt-mcp/blob/main/packages/vite-plugin-mcp/src/server.ts - use this after scanning for +page.svelte files if the current method doesn't work well.
function ModulesInfoPlugin(): Plugin {
  return {
    name: 'vite-plugin-kitbook:module-graph',
    // enforce: 'pre',
    configureServer(server) {
      const get_module_info = ({ filepath }) => {
        const records: any[] = []
        Object.entries(server.environments).forEach(([key, env]) => {
          const mods = env.moduleGraph.getModulesByFile(filepath)
          for (const mod of mods || []) {
            records.push({
              environment: key,
              id: mod.id,
              url: mod.url,
              importers: Array.from(mod.importers),
              importedModules: Array.from(mod.importedModules),
              meta: mod.meta,
              lastHMRTimestamp: mod.lastHMRTimestamp,
              transformResult: mod.transformResult,
            })
          }
        })
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(records),
          }],
        }
      }
    },
  }
}
