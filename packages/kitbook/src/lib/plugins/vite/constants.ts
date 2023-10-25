import type { Language } from '../../kitbook-types'

export const DEFAULT_IMPORT_MODULE_GLOBS = [
  '/src/**/*.{md,svx,svelte,variants.ts,composition}',
  '/README.md',
]

export const DEFAULT_VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 800 }, // height should probably be 1024, but until the iframe can automatically decrease height to fit content let's do this
  // { name: 'desktop', width: 1024, height: 768 },
]

export const DEFAULT_ROUTES_DIR = 'src/routes'
export const DEFAULT_KITBOOK_ROUTE = '/kitbook'
export const UNSET_LANGUAGE: Language = { name: null, code: null }
