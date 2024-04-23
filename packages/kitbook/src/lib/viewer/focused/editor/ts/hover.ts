import type { EditorView, Tooltip, TooltipView } from '@codemirror/view'
import { hoverTooltip } from '@codemirror/view'
import type { DefinitionInfo, QuickInfo } from 'typescript'
import type { TypeScriptConfig } from './types'

type TooltipRenderer = (
  arg0: HoverInfo,
  editorView: EditorView,
) => TooltipView

/**
 * Default, barebones tooltip renderer. Generates
 * structure of a div, containing a series of
 * span elements with the typescript `kind` as
 * classes.
 */
const renderTooltip: TooltipRenderer = (info: HoverInfo) => {
  const div = document.createElement('div')
  if (info.quickInfo?.displayParts) {
    for (const part of info.quickInfo.displayParts) {
      const span = div.appendChild(document.createElement('span'))
      span.className = `quick-info-${part.kind}`
      span.textContent = part.text
    }
  }
  return { dom: div }
}

/**
 * This binds the CodeMirror `hoverTooltip` method
 * with a code that pulls types and documentation
 * from the TypeScript environment.
 */
export function tsHover(config: TypeScriptConfig) {
  return hoverTooltip(async (view, pos): Promise<Tooltip | null> => {
    const hoverData = getHover({ config, pos })

    if (!hoverData)
      return null

    return {
      pos: hoverData.start,
      end: hoverData.end,
      create: () => renderTooltip(hoverData, view),
    }
  })
}

/**
 * This information is passed to the API consumer to allow
 * them to create tooltips however they wish.
 */
interface HoverInfo {
  start: number
  end: number
  typeDef: readonly DefinitionInfo[] | undefined
  quickInfo: QuickInfo | undefined
}

function getHover({
  config: { path, env },
  pos,
}: {
  config: TypeScriptConfig
  pos: number
}): HoverInfo | null {
  const sourcePos = pos
  if (sourcePos === null)
    return null

  const quickInfo = env.languageService.getQuickInfoAtPosition(path, sourcePos)
  if (!quickInfo)
    return null

  const start = quickInfo.textSpan.start

  const typeDef
    = env.languageService.getTypeDefinitionAtPosition(path, sourcePos)
    ?? env.languageService.getDefinitionAtPosition(path, sourcePos)

  return {
    start,
    end: start + quickInfo.textSpan.length,
    typeDef,
    quickInfo,
  }
}
