import { lex, parse } from "fenceparser";
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter, type UserConfigSettings } from "shiki-twoslash";
import type { Highlighter, HighlighterOptions } from 'shiki';
import { escapeSvelte } from "mdsvex";

const DEFAULT_THEMES = ['dark-plus', 'light-plus']

/**
 * Default themes found here: https://www.runpkg.com/?shiki@0.12.1/themes/dark-plus.json
 * Does not support using ```twoslash include foo... as described in https://shikijs.github.io/twoslash/ - not sure if this is possible with a MDSvex highlighter as it works on a code block by code block basis and not file by file as a remark plugin would (i.e. remark-shiki-twoslash)
 * @src https://github.com/pngwn/MDsveX/issues/212#issuecomment-937574889
 * @src https://github.com/shikijs/twoslash/blob/fbf061261fcda90c46e946ce1e2e9357d465c145/packages/remark-shiki-twoslash/src/index.ts#L172-L215
 */
export function shikiTwoslashHighlighter(settings: UserConfigSettings = {}): { highlighter: MDSvexHighlighter } {
  return {
    highlighter: async (code, langToParse, metaToParse) => {

      const codefence = [langToParse, metaToParse].join(' ').trim();
      const { meta, lang } = parseCodefence(codefence, code);

      if (hasMetaInstructingToIgnore(meta, settings.ignoreCodeblocksWithCodefenceMeta)) return code;

      const twoslash = meta.twoslash ? runTwoSlash(code, lang) : undefined;
      console.log({twoslash})
      const themes = (settings.themes || DEFAULT_THEMES) as string[];
      const highlighter = await loadHighlighter({ ...settings, themes });

      const html = themes.map(
        (themeName) => {
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
    throw new Error(`Could not parse the codefence for this code sample \n${code}`);
  }
}

async function loadHighlighter(options: HighlighterOptions): Promise<Highlighter> {
  try {
    return await createShikiHighlighter(options);
  } catch (error) {
    console.warn(`Could not load ${options.themes} from shiki, using default themes: ${DEFAULT_THEMES}`);
    return await createShikiHighlighter({ ...options, themes: DEFAULT_THEMES });
  }
}

function hasMetaInstructingToIgnore(meta: Record<string, any>, ignoreCodeblocksWithCodefenceMeta: string[] = []) {
  return ignoreCodeblocksWithCodefenceMeta.some((key) => meta[key]);
}