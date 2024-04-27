import 'vite/types/customEvent'

export interface FilenameWithTemplate {
  filepath: string
  template: string
}

export interface ToolsFocusOn {
  message: string
}

export interface ToolsChangeState {
  filename: string
  state: Record<string, any>
}

export interface ToolsComponentDetails {
  filename: string
  tagName: string
  serializedState: Record<string, any>
// props: Record<string, any>
  // state: Record<string, any>
}

declare module 'vite/types/customEvent' {
  interface CustomEventMap {
    'kitbook:to-server:open-variants': { filepath: string; props: Record<string, any> }
    'kitbook:to-server:ensure-file-exists': FilenameWithTemplate
    'kitbook:to-client:open-file': { filepath: string; viteBase: string }
    'kitbook:to-client:route-to-edited-file': { filepath: string }

    'kitbook:to-server:tools:request-component-details': Record<string, any>
    'kitbook:to-client:tools:request-component-details': Record<string, any>

    'kitbook:to-server:tools:send-component-details': ToolsComponentDetails
    'kitbook:to-client:tools:send-component-details': ToolsComponentDetails

    'kitbook:to-server:tools:change-state': ToolsChangeState
    'kitbook:to-client:tools:change-state': ToolsChangeState
  }
}
