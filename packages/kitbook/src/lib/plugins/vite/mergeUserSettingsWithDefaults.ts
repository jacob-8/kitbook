import type { KitbookSettings } from '../../kitbook-types'
import { DEFAULT_KITBOOK_SETTINGS } from './constants.js'
import { DEFAULT_VIEWER_OPTIONS } from './viewer/options.js'

export function mergeUserSettingsWithDefaults(userSettings: Partial<KitbookSettings>): KitbookSettings {
  // @ts-expect-error - checking for old value
  if (userSettings.importModuleGlobs)
    throw new Error('Kitbook: `importModuleGlobs` is no longer used. Please define your glob patterns in the root Kitbook `+layout.js` file.')

  checkLanguageSetup(userSettings)

  return {
    ...DEFAULT_KITBOOK_SETTINGS,
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
