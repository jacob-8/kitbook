declare module 'virtual:kitbook-modules' {
  import type { GroupedPageMap } from 'kitbook'

  export const pages: GroupedPageMap
}

declare module 'virtual:kitbook-settings' {
  import type { KitbookSettings } from 'kitbook'

  export const settings: KitbookSettings
}

declare module 'virtual:kitbook-templates' {
  import type { KitbookSettings } from 'kitbook'

  export const variants: string
}
