import type { PageLoad } from './$types'
import { browser } from '$app/environment'

export const load = (async ({ params, parent, url }) => {
  const { parsed_module_sets } = await parent()
  const page_key = params ? params.file : ''
  const parsed_module_set = parsed_module_sets[page_key]

  const server = !browser
  const dark_mode = url.searchParams.get('dark_mode') === 'true'
  const composition_name = url.searchParams.get('composition_name') as string
  const story_name = url.searchParams.get('story_name') as string

  if (composition_name) {
    const composition_module = (await parsed_module_set.compositions[composition_name].load_composition())
    const ssrFalse = composition_module.config?.ssr === false
    const can_mount = !(server && ssrFalse)
    return { parsed_module_set, page_key, composition_module, composition_name, dark_mode, can_mount }
  }

  if (story_name) {
    const stories_module = await parsed_module_set.stories.load_stories()
    const ssrFalse = stories_module.shared_meta?.ssr === false
    const can_mount = !(server && ssrFalse)
    const Component = can_mount ? await parsed_module_set.component.load_component() : null
    return { page_key, Component, stories_module, can_mount, dark_mode }
  }

  const Component = await parsed_module_set.component.load_component()
  return { page_key, Component, dark_mode, parsed_module_set, can_mount: browser }
}) satisfies PageLoad
