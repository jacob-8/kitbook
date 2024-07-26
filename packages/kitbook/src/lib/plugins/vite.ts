import type { Plugin, ResolvedConfig } from 'vite'
import type { KitbookSettings, RPCFunctions } from '../kitbook-types'
import { merge_user_settings_with_defaults } from './context/merge-user-settings-with-defaults.js'
import { copy_kitbook_routes } from './context/copy-kitbook-routes.js'
import { MainPlugin } from './main/plugin.js'
import { ViewerPlugin } from './viewer/plugin.js'
import { RPCPlugin } from './rpc/plugin'

/**
 * Vite plugin to add a Kitbook to SvelteKit projects. Will automatically add Kitbook routes to `src/routes/kitbook` unless you update the `routesDirectory` and `kitbookRoute` settings.
 */
export function kitbook(user_settings: Partial<KitbookSettings> = {}): Plugin[] {
  const context = create_context(user_settings)

  return [
    MainPlugin(context.settings),
    ViewerPlugin(context),
    RPCPlugin(context),
  ]
}

function create_context(user_settings: Partial<KitbookSettings>): KitbookPluginContext {
  const settings = merge_user_settings_with_defaults(user_settings)
  copy_kitbook_routes(settings)

  return {
    settings,
    config: null,
    rpc_functions: {
      // @ts-expect-error function set in RPCPlugin
      svelte_modules: () => {},
      module_updated: (filepath) => {},
    },
  }
}

export interface KitbookPluginContext {
  settings: KitbookSettings
  config: ResolvedConfig
  rpc_functions: RPCFunctions
}
