import type { Plugin } from 'vite'
import { createRPCServer } from 'vite-dev-rpc'
import { RPC_NAME } from '../constants.js'
import type { RPCFunctions } from '../../kitbook-types'
import type { KitbookPluginContext } from '../vite.js'
import { get_svelte_modules } from './get-svelte-modules.js'

export function RPCPlugin(context: KitbookPluginContext): Plugin {
  return {
    name: 'vite-plugin-kitbook:rpc',
    enforce: 'pre',
    apply: 'serve', // TODO: remove later once also getting modules from build

    configResolved(_config) {
      context.config = _config
    },

    configureServer(server) {
      context.rpc_functions.svelte_modules = () => get_svelte_modules(server, context.config.root)

      const rpc_server = createRPCServer<RPCFunctions>(RPC_NAME, server.ws, context.rpc_functions)

      const debounce_module_updated = debounce((filepath: string) => {
        rpc_server.module_updated.asEvent(filepath)
      }, 100)

      server.watcher.on('change', (filepath) => {
        debounce_module_updated(filepath)
      })
    },
  }
}

function debounce(func: Function, wait: number) {
  let timeout: any = null
  return function (...args: any[]) {
    const later = () => {
      timeout = null
      func(...args)
    }
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
