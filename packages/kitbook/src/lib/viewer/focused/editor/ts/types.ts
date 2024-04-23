import type { VirtualTypeScriptEnvironment } from '@typescript/vfs'

export interface TypeScriptConfig {
  path: string
  env: VirtualTypeScriptEnvironment
}
