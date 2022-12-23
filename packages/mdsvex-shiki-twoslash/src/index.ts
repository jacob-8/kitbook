import { lex, parse } from "fenceparser";
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter, type UserConfigSettings } from "shiki-twoslash";
import { getHighlighter, Highlighter, HighlighterOptions } from 'shiki';
import { escapeSvelte } from "mdsvex";

const DEFAULT_THEMES = ['dark-plus', 'light-plus'];

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

      const codefence = [langToParse, metaToParse].join(' ').trim();
      const { meta, lang } = parseCodefence(codefence, code);

      if (hasMetaInstructingToIgnore(meta, settings.ignoreCodeblocksWithCodefenceMeta)) return code;

      const twoslash = meta.twoslash ? runTwoSlash(code, lang) : undefined;
      const themes = (settings.themes || DEFAULT_THEMES) as string[];
      const highlighters = await loadHighlighters({ ...settings, themes });

      const html = highlighters.map(
        (highlighter) => {
          const themeName = highlighter.getTheme().name;
          // .split("/").pop().replace(".json", "")
          return renderCodeToHTML(twoslash?.code || code, lang, meta, { ...settings, themeName }, highlighter, twoslash)
        }
      ).join('');

      return escapeSvelte(html);
    }
  }
}

type MDSvexHighlighter = (code: string, lang: string | undefined, metastring: string | undefined) => string | Promise<string>;

function parseCodefence(codefence: string, code: string) {
  try {
    const [lang, ...tokens] = lex(codefence) as [string, ...(string | number)[]]
    const meta = parse(tokens) as Record<string, any>;
    return { lang, meta };
  } catch (error) {
    throw new Error(`Could not parse the codefence for this code sample: \n${code}`);
  }
}

const highlighterCache = new Map<UserConfigSettings, Promise<Highlighter[]>>()

async function loadHighlighters(settings: HighlighterOptions): Promise<Highlighter[]> {
  if (!highlighterCache.has(settings)) {
    highlighterCache.set(settings, setupHighlightersDefinedInSettings(settings))
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const highlighters = await highlighterCache.get(settings)!
  return highlighters;
}

function setupHighlightersDefinedInSettings(settings: HighlighterOptions): Promise<Highlighter[]> {
  const themes = settings.themes || (settings.theme ? [settings.theme] : DEFAULT_THEMES)
  return Promise.all(
    themes.map(async theme => {
      const highlighter = await getHighlighter({ ...settings, theme, themes: undefined })
      return highlighter
    })
  )
}

function hasMetaInstructingToIgnore(meta: Record<string, any>, ignoreCodeblocksWithCodefenceMeta: string[] = []) {
  return ignoreCodeblocksWithCodefenceMeta.some((key) => meta[key]);
}
