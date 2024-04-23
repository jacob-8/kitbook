import type { Diagnostic } from '@codemirror/lint'
import { linter } from '@codemirror/lint'
import type { VirtualTypeScriptEnvironment } from '@typescript/vfs'
import { convertTSDiagnosticToCM, isDiagnosticWithLocation } from './utils'
import type { TypeScriptConfig } from './types'

/**
 * Binds the TypeScript `lint()` method with TypeScript's
 * semantic and syntactic diagnostics. You can use
 * the `getLints` method for a lower-level interface
 * to the same data.
 */
export function tsLinter(config: TypeScriptConfig) {
  return linter(async (): Promise<readonly Diagnostic[]> => {
    return getLints(config)
  })
}

/**
 * Lower-level interface to get semantic and syntactic
 * diagnostics from the TypeScript environment.
 *
 * This is used by tsLinter and tsLinterWorker,
 * but you can use it directly to power other UI.
 */
export function getLints({
  env,
  path,
}: {
  env: VirtualTypeScriptEnvironment
  path: string
}) {
  // Don't crash if the relevant file isn't created yet.
  const exists = env.getSourceFile(path)
  if (!exists)
    return []

  const syntaticDiagnostics = env.languageService.getSyntacticDiagnostics(path)
  const semanticDiagnostics = env.languageService.getSemanticDiagnostics(path)

  const diagnostics = [...syntaticDiagnostics, ...semanticDiagnostics].filter(
    isDiagnosticWithLocation,
  )

  return diagnostics.map(convertTSDiagnosticToCM)
}
