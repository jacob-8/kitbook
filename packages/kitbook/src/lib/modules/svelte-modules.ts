import { writable } from 'svelte/store'
import type { SvelteModules } from 'kitbook'
import { get_rpc } from './rpc-client'

export const svelte_modules = writable<SvelteModules>({}, update_svelte_modules)

export function update_svelte_modules() {
  get_rpc().then(async (rpc) => {
    if (!rpc)
      return
    const routes = await rpc.svelte_modules()
    svelte_modules.set(routes)
  })
}
