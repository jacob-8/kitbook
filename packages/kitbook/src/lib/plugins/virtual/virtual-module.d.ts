declare module 'virtual:kitbook' {
  import type { GroupedPageMap, KitbookSettings } from 'kitbook'

  export const pages: GroupedPageMap
  export const settings: KitbookSettings
}
