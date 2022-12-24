import { lex, parse } from "fenceparser";
import { renderCodeToHTML, runTwoSlash, type UserConfigSettings } from "shiki-twoslash";
import { getHighlighter, Highlighter, HighlighterOptions } from 'shiki';
import { TwoSlashReturn } from "@typescript/twoslash";
import { escapeSvelte } from "mdsvex";
import { setLineNumberBaseTo1 } from "./setLineNumberBaseTo1";

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
      const { meta, lang } = parseCodefence(code, langToParse, metaToParse);
      if (hasMetaInstructingToIgnore(meta, settings.ignoreCodeblocksWithCodefenceMeta)) return code;
      const twoslash = meta.twoslash ? runTwoSlash(code, lang) : undefined;
      const highlighters = await loadHighlighters(settings);
      const html = renderHTML({ code, lang, meta, settings, highlighters, twoslash });
      return escapeSvelte(html);
    }
  }
}

type MDSvexHighlighter = (code: string, lang: string | undefined, metastring: string | undefined) => string | Promise<string>;

function parseCodefence(code: string, langToParse: string | undefined, metaToParse: string | undefined) {
  try {
    const codefence = [langToParse, metaToParse].join(' ').trim(); // allows for codefences written like `ts{3-4}` that don't have a space between the lang and the start of the meta
    const [lang, ...tokens] = lex(codefence) as [string, ...(string | number)[]]
    const meta = parse(tokens) as Record<string, any>;
    return { lang, meta };
  } catch (error) {
    throw new Error(`Could not parse the codefence for this code sample: \n${code}`);
  }
}

function hasMetaInstructingToIgnore(meta: Record<string, any>, ignoreCodeblocksWithCodefenceMeta: string[] = []) {
  return ignoreCodeblocksWithCodefenceMeta.some((key) => meta[key]);
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

const DEFAULT_THEMES = ['dark-plus', 'light-plus'];
function setupHighlightersDefinedInSettings(settings: HighlighterOptions): Promise<Highlighter[]> {
  const themes = settings.themes || (settings.theme ? [settings.theme] : DEFAULT_THEMES)
  return Promise.all(
    themes.map(async theme => {
      const highlighter = await getHighlighter({ ...settings, theme, themes: undefined })
      return highlighter
    })
  )
}

function renderHTML({ code, lang, meta, settings, highlighters, twoslash }:
  {
    code: string,
    lang: string,
    meta: Record<string, any>,
    settings: UserConfigSettings
    highlighters: Highlighter[],
    twoslash: TwoSlashReturn | undefined,
  }) {
  const metaWithLineNumbersBasedOn1 = twoslash ? meta : setLineNumberBaseTo1(meta);
  return highlighters.map(
    (highlighter) => {
      // allows for a string (name of already supported theme), a filepath, or a JSON theme object
      const themeName = (highlighter.getTheme().name.split("/").pop() as string).replace(".json", "");
      return renderCodeToHTML(twoslash?.code || code, twoslash?.extension || lang, metaWithLineNumbersBasedOn1, { ...settings, themeName }, highlighter, twoslash);
    }
  ).join('');
}