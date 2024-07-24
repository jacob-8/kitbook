import { createRPCClient } from 'vite-dev-rpc'
import type { BirpcReturn } from 'birpc'
import { createHotContext } from 'vite-hot-client'
import type { RPCFunctions } from 'kitbook'
import { RPC_NAME } from '../plugins/vite/constants'
import { update_svelte_modules } from './svelte-modules'
import { browser } from '$app/environment'

let rpc: BirpcReturn<RPCFunctions, Pick<RPCFunctions, 'module_updated'>>

export async function get_rpc() {
  if (!browser)
    return
  if (rpc)
    return rpc

  // eslint-disable-next-line require-atomic-updates
  rpc = createRPCClient<RPCFunctions, Pick<RPCFunctions, 'module_updated'>>(
    RPC_NAME,
    (await createHotContext())!,
    {
      module_updated() {
        update_svelte_modules()
      },
    },
  )
  return rpc
}
