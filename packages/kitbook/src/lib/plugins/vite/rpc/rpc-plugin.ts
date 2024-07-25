import type { Plugin, ResolvedConfig } from 'vite'
import { createRPCServer } from 'vite-dev-rpc'
import { RPC_NAME } from '../constants.js'
import type { RPCFunctions } from '../../../kitbook-types'
import { get_svelte_modules } from './get-svelte-modules.js'

export function kitbookRPC(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'vite-plugin-kitbook:routes',
    enforce: 'pre',
    apply: 'serve', // TODO: remove later once also getting modules from build

    configResolved(_config) {
      config = _config
    },

    configureServer(server) {
      const rpcFunctions: RPCFunctions = {
        svelte_modules: () => get_svelte_modules(server, config.root),
        module_updated: () => {},
      }

      const rpc_server = createRPCServer<RPCFunctions>(RPC_NAME, server.ws, rpcFunctions)

      const debounce_module_updated = debounce(() => {
        rpc_server.module_updated.asEvent()
      }, 100)

      server.middlewares.use((req, res, next) => {
        debounce_module_updated()
        next()
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
