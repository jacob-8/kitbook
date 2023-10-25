import type { Language } from '../../kitbook-types'

export const DEFAULT_IMPORT_MODULE_GLOBS = [
  '/src/**/*.{md,svx,svelte,variants.ts,composition}',
  '/README.md',
]

export const DEFAULT_VIEWPORTS = [
  { name: 'mobile', width: 320, height: 568 },
  { name: 'desktop', width: 1024, height: 768 },
]
export const UNSET_LANGUAGE: Language = { name: null, code: null }

export const DEFAULT_ROUTES_DIR = 'src/routes'
export const DEFAULT_KITBOOK_ROUTE = '/kitbook'
