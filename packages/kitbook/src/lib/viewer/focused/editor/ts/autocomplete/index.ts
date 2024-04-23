import type { Completion, CompletionContext, CompletionResult, CompletionSource } from '@codemirror/autocomplete'
import type { VirtualTypeScriptEnvironment } from '@typescript/vfs'
import pkg from 'typescript'
import type { TypeScriptConfig } from '../types'
import { AUTOCOMPLETION_SYMBOLS } from './symbols'
import { matchBefore } from './matchBefore'
const { ScriptElementKind } = pkg
/**
 * There is some overlap between CodeMirror's
 * types and TypeScripts. This is all of the default
 * icons for CodeMirror: if TypeScript gives us one
 * of these, we pass it through.
 */
const DEFAULT_CODEMIRROR_TYPE_ICONS = new Set([
  `class`,
  `constant`,
  `enum`,
  `function`,
  `interface`,
  `keyword`,
  `method`,
  `namespace`,
  `property`,
  `text`,
  `type`,
  `variable`,
])

/**
 * Create a `CompletionSource` that queries
 * the _on-thread_ TypeScript environments for autocompletions
 * at this character.
 */
export function tsAutocomplete(config: TypeScriptConfig): CompletionSource {
  return async (
    context: CompletionContext,
  ): Promise<CompletionResult | null> => {
    return getAutocompletion({
      ...config,
      context,
    })
  }
}

const TS_COMPLETE_BLOCKLIST = [ScriptElementKind.warning]

export async function getAutocompletion({
  env,
  path,
  context,
}: {
  env: VirtualTypeScriptEnvironment
  path: string
  /**
   * Allow this to be a subset of the full CompletionContext
   * object, because the raw object isn't serializable.
   */
  context: Pick<CompletionContext, 'pos' | 'explicit'>
}): Promise<CompletionResult | null> {
  const { pos, explicit } = context
  const rawContents = env.getSourceFile(path)?.getFullText()

  if (!rawContents)
    return null

  // If there's space behind the cursor, don't try and autocomplete.
  // https://codemirror.net/examples/autocompletion/
  let word = matchBefore(rawContents, pos, /\w*/)
  if (!word?.text)
    word = matchBefore(rawContents, pos, /\./)

  if (!word?.text && !explicit)
    return null

  const completionInfo = env.languageService.getCompletionsAtPosition(
    path,
    pos,
    {},
    {},
  )

  // TODO: build ATA support for a 'loading' state
  // while types are being fetched
  if (!completionInfo)
    return null

  const options = completionInfo.entries
    .filter(
      entry =>
        !TS_COMPLETE_BLOCKLIST.includes(entry.kind)
        && (entry.sortText < '15'
          || (completionInfo.optionalReplacementSpan?.length
            && AUTOCOMPLETION_SYMBOLS.includes(entry.name))),
    )
    .map((entry): Completion => {
      const boost = -Number(entry.sortText) || 0
      let type = entry.kind ? String(entry.kind) : undefined

      if (type === 'member')
        type = 'property'

      if (type && !DEFAULT_CODEMIRROR_TYPE_ICONS.has(type))
        type = undefined

      return {
        label: entry.name,
        type,
        boost,
      }
    })

  return {
    from: word ? (word.text === '.' ? word.to : word.from) : pos,
    options,
  }
}
