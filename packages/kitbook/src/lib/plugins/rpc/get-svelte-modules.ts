import type { ModuleNode, ViteDevServer } from 'vite'
import type { SvelteModules } from '../../kitbook-types'
import { get_sfc_list } from './get-sfc-list.js'

export async function get_svelte_modules(server: ViteDevServer, root: string): Promise<SvelteModules> {
  const source = `${root}/src`
  const components = await get_sfc_list(source)

  const components_with_info: SvelteModules = components.reduce((acc, id) => {
    const path = `${source}/${id}`
    const { parents, children } = get_relatives(server, path)
    acc[`/${id.replace('.svelte', '')}`] = {
      // is_route: /\broutes.*\+page\.svelte$/.test(id),
      parents,
      children,
    }
    return acc
  }, {})
  return components_with_info
}

function get_relatives(server: ViteDevServer, id: string): { parents: string[], children: string[] } {
  const module = server.moduleGraph.getModuleById(id) // getModuleById will only give info once Vite server has loaded it by a page request
  if (!module)
    return { parents: [], children: [] }
  const parents = extractModuleIds(module.importers)
  const children = extractModuleIds(module.importedModules)
  return { parents, children }
}

function extractModuleIds(modules: Set<ModuleNode>): string[] {
  return Array.from(modules || [])
    .map(module => module.id || '')
    .map(id => id.replace(/.*src\//, ''))
    .filter(id => /\.svelte$/.test(id))
    .map(id => id.replace(/\.svelte$/, ''))
}
