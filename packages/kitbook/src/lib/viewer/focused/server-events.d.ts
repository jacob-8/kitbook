import 'vite/types/customEvent'

declare module 'vite/types/customEvent' {
  interface CustomEventMap {
    'kitbook:ensure-file-exists': { filename: string; template: string }
    'kitbook:open-file': { filename: string }
  }
}
