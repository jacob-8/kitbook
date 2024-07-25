import type { KitbookSettings, Language, ViewerOptions } from '../kitbook-types'

export const DEFAULT_VIEWPORTS = [
  { name: 'mobile', width: 320, height: 568 },
  { name: 'desktop', width: 1024, height: 768 },
]
export const UNSET_LANGUAGE: Language = { name: null, code: null }

export const DEFAULT_ROUTES_DIR = 'src/routes'
export const DEFAULT_KITBOOK_ROUTE = '/kitbook'

export const DEFAULT_KITBOOK_SETTINGS: KitbookSettings = {
  title: 'Kitbook',
  description: 'Component workbench',
  viewports: DEFAULT_VIEWPORTS,
  routesDirectory: DEFAULT_ROUTES_DIR,
  kitbookRoute: DEFAULT_KITBOOK_ROUTE,
  languages: [UNSET_LANGUAGE],
}

export const DEFAULT_VIEWER_OPTIONS: ViewerOptions = {
  holdMode: true,
  toggleKeyCombo: 'alt-shift',
  showToggleButton: 'always',
  openToolsIn: 'document-picture-in-picture',
}

export const RPC_NAME = 'kitbook'
