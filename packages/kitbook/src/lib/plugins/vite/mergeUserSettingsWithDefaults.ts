import type { KitbookSettings } from '../../kitbook-types'
import { DEFAULT_KITBOOK_ROUTE, DEFAULT_ROUTES_DIR, DEFAULT_VIEWPORTS, UNSET_LANGUAGE } from './constants.js'
import { DEFAULT_VIEWER_OPTIONS } from './viewer/options.js'

export function mergeUserSettingsWithDefaults(userSettings: Partial<KitbookSettings>): KitbookSettings {
  checkLanguageSetup(userSettings)

  return {
    title: 'Kitbook',
    description: 'Component workbench',
    viewports: DEFAULT_VIEWPORTS,
    routesDirectory: DEFAULT_ROUTES_DIR,
    kitbookRoute: DEFAULT_KITBOOK_ROUTE,
    languages: [UNSET_LANGUAGE],
    ...userSettings,
    viewer: {
      ...DEFAULT_VIEWER_OPTIONS,
      ...userSettings.viewer || {},
    },
  }
}

function checkLanguageSetup({ languages, addLanguageToUrl }: Partial<KitbookSettings>) {
  if (languages?.length === 0)
    throw new Error('Kitbook: Do not pass an empty `languages` array in your config.')

  const hasLanguages = languages?.length
  const hasLanguageFunction = addLanguageToUrl && typeof addLanguageToUrl === 'function'

  if (!hasLanguages && hasLanguageFunction)
    throw new Error('Kitbook config is missing `languages`. You must provide a `languages` array to be used by the `addLanguageToUrl`.')

  if (hasLanguages && !hasLanguageFunction)
    throw new Error('Kitbook config is missing `addLanguageToUrl` function. You must provide a `addLanguageToUrl` function for Kitbook to know how to add your `languages` to each sandboxed url.')
}
