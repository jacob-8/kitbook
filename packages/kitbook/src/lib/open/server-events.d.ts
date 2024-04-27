import 'vite/types/customEvent'

export interface FilenameWithTemplate {
  filepath: string
  template: string
}

export interface ToolsFocusOn {
  message: string
}

export interface ToolsChangeState {
  instance_to_change: string
  state: Record<string, any>
}

declare module 'vite/types/customEvent' {
  interface CustomEventMap {
    // to server
    'from-kitbook:open-variants': { filepath: string; props: Record<string, any> }
    'from-kitbook:ensure-file-exists': FilenameWithTemplate
    'from-kitbook:tools:focus-on': ToolsFocusOn
    'from-kitbook:tools:change-state': ToolsChangeState

    // to client
    'to-kitbook:open-file': { filepath: string; viteBase: string }
    'to-kitbook:route-to-edited-file': { filepath: string }
    'to-kitbook:tools:focus-on': ToolsFocusOn
    'to-kitbook:tools:change-state': ToolsChangeState
  }
}
