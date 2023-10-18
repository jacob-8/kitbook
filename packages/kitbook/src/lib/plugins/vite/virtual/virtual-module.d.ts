declare module 'virtual:kitbook' {
  import type { GroupedPageMap, KitbookSettings, Variant } from 'kitbook'

  export const pages: GroupedPageMap
  export const settings: KitbookSettings
  export const variantsTemplate: string
}
