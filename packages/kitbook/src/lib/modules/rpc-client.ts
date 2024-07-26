import { createRPCClient } from 'vite-dev-rpc'
import type { BirpcReturn } from 'birpc'
import { createHotContext } from 'vite-hot-client'
import { writable } from 'svelte/store'
import type { RPCFunctions, SvelteModules } from 'kitbook'
import { RPC_NAME } from '../plugins/constants'
import { browser } from '$app/environment'

export const rpc_client = create_rpc_client_stores()

function create_rpc_client_stores() {
  let functions: BirpcReturn<RPCFunctions, Pick<RPCFunctions, 'module_updated'>>
  const svelte_modules = writable<SvelteModules>({})
  const latest_edited_filepath = writable<string | null>(null)

  if (browser) {
    createHotContext().then((hot) => {
      functions = createRPCClient<RPCFunctions, Pick<RPCFunctions, 'module_updated'>>(
        RPC_NAME,
        hot,
        {
          module_updated(filepath) {
            latest_edited_filepath.set(filepath)
            update_svelte_modules()
          },
        },
      )
      update_svelte_modules()

      async function update_svelte_modules() {
        const routes = await functions.svelte_modules()
        svelte_modules.set(routes)
      }
    })
  }

  return {
    functions,
    svelte_modules,
    latest_edited_filepath,
  }
}
