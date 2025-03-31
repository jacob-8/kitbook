import type { KitbookSettings, ParsedModuleSet, ParsedModuleSets } from '../../kitbook-types.js'
import { parse_path } from './parse_path.js'
import { remove_initial_digit_and_hyphens } from './remove_initial_digit_and_hyphens.js'
import { resolve_relative_imports } from './resolve_relative_imports.js'

const SVELTE_COMPONENT_PATH = /['"](.+?\.svelte)['"]/g

export function parse_modules({
  components_raw_eager,
  markdown_raw,
  compositions_raw,
  stories_raw,
  settings,
}: {
  components_raw_eager: Record<string, unknown>
  markdown_raw: Record<string, () => Promise<unknown>>
  compositions_raw: Record<string, () => Promise<unknown>>
  stories_raw: Record<string, () => Promise<unknown>>
  settings?: KitbookSettings
}): ParsedModuleSets {
  const { routes_directory, alias: user_added_aliases } = settings || { routes_directory: 'src/routes' }

  const aliases = {
    $lib: 'src/lib',
    ...user_added_aliases,
  }

  const parsed_module_sets: ParsedModuleSets = {}

  for (const [path, value] of Object.entries(components_raw_eager) as [string, string][]) {
    const component_raw_without_comments = value.replace(/<!--.*?-->/gs, '')
    const children_paths = []
    const children_imports = component_raw_without_comments.match(SVELTE_COMPONENT_PATH)
    if (children_imports) {
      for (const child_import of children_imports) {
        let child_path = child_import.slice(1, -1)
        let alias_found = false

        if (child_path.startsWith('.')) {
          child_path = resolve_relative_imports({ parent_path: path, relative_path: child_path })
        } else {
          for (const [alias_key, alias_value] of Object.entries(aliases)) {
            if (child_path.startsWith(alias_key)) {
              children_paths.push(child_path
                .replace(alias_key, alias_value.replace('src/', ''))
                .replace('.svelte', ''),
              )
              alias_found = true
              break
            }
          }
        }
        if (!alias_found)
          children_paths.push(child_path.replace('/src/', '').replace('.svelte', ''))
      }
    }

    const is_route = path.startsWith(`/${routes_directory}`) && (path.includes('+page.svelte') || path.includes('+layout.svelte'))

    const { dir, name } = parse_path(path)
    const url = dir + name

    parsed_module_sets[url] = {
      is_route,
      url,
      name: remove_initial_digit_and_hyphens(name),
      component: {
        path,
        raw: value as string,
        parent_paths: [],
        children_paths,
        load_component: async () => {
          const { default: Component } = await import(/* @vite-ignore */path)
          return Component
        },
      },
    }
  }

  // add parents to children
  for (const [path, value] of Object.entries(parsed_module_sets)) {
    for (const child_path of value.component.children_paths) {
      if (!parsed_module_sets[child_path])
        console.info({ path, child_path, module: parsed_module_sets[child_path] })
      else
        parsed_module_sets[child_path].component.parent_paths.push(path)
    }
  }

  for (const [path, load_raw] of Object.entries(markdown_raw) as [string, () => Promise<string>][]) {
    const { dir, name } = parse_path(path)
    const url = dir + name
    const markdown: ParsedModuleSet['markdown'] = {
      path,
      load_raw,
    }
    if (parsed_module_sets[url]) {
      parsed_module_sets[url].markdown = markdown
    } else {
      parsed_module_sets[url] = {
        url,
        name: remove_initial_digit_and_hyphens(name),
        markdown,
      }
    }
  }

  for (const [path, load_raw] of Object.entries(compositions_raw) as [string, () => Promise<string>][]) {
    const { dir, name, ext } = parse_path(path)
    const url = dir + name
    const composition: ParsedModuleSet['compositions'][0] = {
      path,
      load_raw,
      load_composition: async () => await import(/* @vite-ignore */path),
    }
    const composition_name = ext === 'composition' ? 'default' : ext.split('.')[0]
    if (parsed_module_sets[url]) {
      parsed_module_sets[url].compositions = {
        ...parsed_module_sets[url].compositions,
        [composition_name]: composition,
      }
    } else {
      parsed_module_sets[url] = {
        url,
        name: remove_initial_digit_and_hyphens(name),
        compositions: {
          [composition_name]: composition,
        },
      }
    }
  }

  for (const [path, load_raw] of Object.entries(stories_raw) as [string, () => Promise<string>][]) {
    const { dir, name } = parse_path(path)
    const url = dir + name
    const stories: ParsedModuleSet['stories'] = {
      path,
      load_raw,
      load_stories: async () => await import(/* @vite-ignore */path),
    }
    if (parsed_module_sets[url])
      parsed_module_sets[url].stories = stories
  }

  return parsed_module_sets
}
