import 'vite/types/customEvent'

export interface FilenameWithTemplate {
  filepath: string
  template: string
}

declare module 'vite/types/customEvent' {
  interface CustomEventMap {
    // to server
    'kitbook:open-variants': { filepath: string; props: Record<string, any> }
    'kitbook:ensure-file-exists': FilenameWithTemplate

    // to client
    'kitbook:open-file': { filepath: string; viteBase: string }
  }
}
