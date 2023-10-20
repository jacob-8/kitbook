import 'vite/types/customEvent'

declare module 'vite/types/customEvent' {
  interface CustomEventMap {
    'kitbook:open-variants': { filepath: string; props: Record<string, any> }
    'kitbook:ensure-file-exists': { filepath: string; template: string }
    'kitbook:open-file': { filepath: string; viteBase: string }
  }
}
