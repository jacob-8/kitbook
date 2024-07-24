import type { ViteDevServer } from 'vite'
import { get_svelte_modules } from './get-svelte-modules'

const ROOT = 'C:/dev/examples/rpc'

vi.mock('./get-sfc-list', () => {
  return {
    get_sfc_list: () => [
      'routes/+page.svelte',
      'routes/LocalButton.svelte',
      'routes/hi/+page.svelte',
      'lib/Button.svelte',
      'lib/InButton.svelte',
    ],
  }
})

function assemble_id(path: string) {
  return `${ROOT}/src/${path}`
}

describe(get_svelte_modules, () => {
  test('works', async () => {
    const server = {
      moduleGraph: {
        getModuleById: (id: string) => {
          if (id === assemble_id('lib/Button.svelte')) {
            return {
              importers: new Set([{ id: assemble_id('routes/hi/+page.svelte') }]),
              importedModules: new Set([{ id: assemble_id('lib/InButton.svelte') }]),
            }
          }
          if (id === assemble_id('lib/InButton.svelte')) {
            return {
              importers: new Set([
                { id: assemble_id('routes/+page.svelte') },
                { id: assemble_id('lib/Button.svelte') },
              ]),
              importedModules: new Set([]),
            }
          }
          if (id === assemble_id('routes/+page.svelte')) {
            return {
              importers: new Set([]),
              importedModules: new Set([{ id: assemble_id('lib/InButton.svelte') }, { id: assemble_id('routes/LocalButton.svelte') }]),
            }
          }
          if (id === assemble_id('routes/LocalButton.svelte')) {
            return {
              importers: new Set([{ id: assemble_id('routes/+page.svelte') }]),
              importedModules: new Set([]),
            }
          }
          if (id === assemble_id('routes/hi/+page.svelte')) {
            return {
              importers: new Set([]),
              importedModules: new Set([{ id: assemble_id('lib/Button.svelte') }]),
            }
          }
          return null
        },
      },
    } as ViteDevServer

    const expected = {
      '/routes/+page': {
        // is_route: true,
        parents: [],
        children: [
          'lib/InButton',
          'routes/LocalButton',
        ],
      },
      '/routes/LocalButton': {
        // is_route: false,
        parents: [
          'routes/+page',
        ],
        children: [],
      },
      '/routes/hi/+page': {
        // is_route: true,
        parents: [],
        children: [
          'lib/Button',
        ],
      },
      '/lib/Button': {
        // is_route: false,
        parents: [
          'routes/hi/+page',
        ],
        children: [
          'lib/InButton',
        ],
      },
      '/lib/InButton': {
        // is_route: false,
        parents: [
          'routes/+page',
          'lib/Button',
        ],
        children: [],
      },
    }

    expect(await get_svelte_modules(server, ROOT)).toEqual(expected)
  })
})
