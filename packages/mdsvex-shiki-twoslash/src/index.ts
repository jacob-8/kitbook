import { lex, parse } from 'fenceparser'
import { type UserConfigSettings, renderCodeToHTML, runTwoSlash } from 'shiki-twoslash'
import type { Highlighter, HighlighterOptions } from 'shiki'
import { getHighlighter } from 'shiki'
import type { TwoSlashReturn } from '@typescript/twoslash'
import { escapeSvelte } from 'mdsvex'
import { setLineNumberBaseTo1 } from './setLineNumberBaseTo1'

/**
 * Default themes found here: https://www.runpkg.com/?shiki@0.12.1/themes/dark-plus.json
 * Does not support using ```twoslash include foo... as described in https://shikijs.github.io/twoslash/ - not sure if this is possible with MDSvex as the MDSvex highlighter works on a code block by code block basis and not file by file as a remark plugin would (i.e. remark-shiki-twoslash)
 * @src https://github.com/shikijs/twoslash/blob/main/packages/remark-shiki-twoslash/README.md
 * @src https://github.com/shikijs/twoslash/blob/main/packages/shiki-twoslash/README.md
 * @src Initially inspired by https://github.com/pngwn/MDsveX/issues/212#issuecomment-937574889
 */
export function shikiTwoslashHighlighter(settings: UserConfigSettings = {}): { highlighter: MDSvexHighlighter } {
  return {
    highlighter: async (code, langToParse, metaToParse) => {
      const { meta, lang } = parseCodefence(code, langToParse, metaToParse)
      if (hasMetaInstructingToIgnore(meta, settings.ignoreCodeblocksWithCodefenceMeta))
        return code
      const twoslash = meta.twoslash ? runTwoSlash(code, lang) : undefined
      const highlighters = await loadHighlighters(settings)
      const html = renderHTML({ code, lang, meta, settings, highlighters, twoslash })
      const escapedHtml = escapeSvelte(html)
      return add_copy_button(escapedHtml)
    },
  }
}

function add_copy_button(html: string) {
  return html.replace('</pre>', `<button type="button" class="copy-code-block" onclick="(function(btn){const pre=btn.closest('pre');let text='';pre.querySelectorAll('.code-container .line').forEach(line=>{text+=line.textContent+'\\\\n';});navigator.clipboard.writeText(text).catch(() => { alert('Error copying') })})(this)"></button></pre>`)
}

// for readability, here is the function above, this code is not actually needed
// function inlined_function(btn) {
//   const pre = btn.closest('pre')
//   let text = ''
//   pre.querySelectorAll('.code-container .line').forEach((line) => { text += line.textContent + '\\\\n' })
//   navigator.clipboard.writeText(text).catch(() => { alert('Error copying') })
// }

type MDSvexHighlighter = (code: string, lang: string | undefined, metastring: string | undefined) => string | Promise<string>

function parseCodefence(code: string, langToParse: string | undefined, metaToParse: string | undefined) {
  try {
    const codefence = [langToParse, metaToParse].join(' ').trim() // allows for codefences written like `ts{3-4}` that don't have a space between the lang and the start of the meta
    const [lang, ...tokens] = lex(codefence) as [string, ...(string | number)[]]
    const meta = parse(tokens) as Record<string, any>
    return { lang, meta }
  }
  catch (error) {
    throw new Error(`Could not parse the codefence for this code sample: \n${code}`)
  }
}

function hasMetaInstructingToIgnore(meta: Record<string, any>, ignoreCodeblocksWithCodefenceMeta: string[] = []) {
  return ignoreCodeblocksWithCodefenceMeta.some(key => meta[key])
}

const highlighterCache = new Map<UserConfigSettings, Promise<Highlighter[]>>()
async function loadHighlighters(settings: HighlighterOptions): Promise<Highlighter[]> {
  if (!highlighterCache.has(settings))
    highlighterCache.set(settings, setupHighlightersDefinedInSettings(settings))

  const highlighters = await highlighterCache.get(settings)!
  return highlighters
}

const DEFAULT_THEMES = ['dark-plus', 'light-plus']
function setupHighlightersDefinedInSettings(settings: HighlighterOptions): Promise<Highlighter[]> {
  const themes = settings.themes || (settings.theme ? [settings.theme] : DEFAULT_THEMES)
  return Promise.all(
    themes.map(async (theme) => {
      const highlighter = await getHighlighter({ ...settings, theme, themes: undefined })
      return highlighter
    }),
  )
}

function renderHTML({
  code,
  lang,
  meta,
  settings,
  highlighters,
  twoslash,
}: {
  code: string
  lang: string
  meta: Record<string, any>
  settings: UserConfigSettings
  highlighters: Highlighter[]
  twoslash: TwoSlashReturn | undefined
}) {
  const metaWithLineNumbersBasedOn1 = twoslash ? meta : setLineNumberBaseTo1(meta)
  return highlighters.map(
    (highlighter) => {
      // allows for a string (name of already supported theme), a filepath, or a JSON theme object
      const themeName = (highlighter.getTheme().name.split('/').pop() as string).replace('.json', '')
      return renderCodeToHTML(twoslash?.code || code, twoslash?.extension || lang, metaWithLineNumbersBasedOn1, { ...settings, themeName }, highlighter, twoslash)
    },
  ).join('')
}
