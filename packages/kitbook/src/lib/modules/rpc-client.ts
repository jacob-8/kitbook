import { createRPCClient } from 'vite-dev-rpc'
import type { BirpcReturn } from 'birpc'
import { createHotContext } from 'vite-hot-client'
import { writable } from 'svelte/store'
import type { RPCFunctions, SvelteModules } from 'kitbook'
import { RPC_NAME } from '../plugins/constants'
import { browser } from '$app/environment'

export const rpc_client = create_rpc_client_stores()

function create_rpc_client_stores() {
  let _functions: BirpcReturn<RPCFunctions, Pick<RPCFunctions, 'module_updated' | 'open_in_editor'>>
  const svelte_modules = writable<SvelteModules>({})
  const latest_edited_filepath = writable<string | null>(null)

  if (browser) {
    createHotContext().then((hot) => {
      _functions = createRPCClient<RPCFunctions, Pick<RPCFunctions, 'module_updated' | 'open_in_editor'>>(
        RPC_NAME,
        hot,
        {
          module_updated(filepath) {
            latest_edited_filepath.set(filepath)
            update_svelte_modules()
          },
          open_in_editor(url) {
            fetch(url)
          },
        },
      )
      update_svelte_modules()

      async function update_svelte_modules() {
        const routes = await _functions.svelte_modules()
        svelte_modules.set(routes)
      }
    })
  }

  return {
    get functions() {
      return _functions
    },
    svelte_modules,
    latest_edited_filepath,
  }
}
