import { lex, parse } from "fenceparser";
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter } from "shiki-twoslash";
import { escapeSvelte } from "mdsvex";

const DEFAULT_THEMES = ['dark-plus', 'github-dark']

/**
 * default themes found here: https://www.runpkg.com/?shiki@0.12.1/themes/dark-plus.json
 * @src https://github.com/pngwn/MDsveX/issues/212#issuecomment-937574889
 * @src https://github.com/shikijs/twoslash/blob/fbf061261fcda90c46e946ce1e2e9357d465c145/packages/remark-shiki-twoslash/src/index.ts#L172-L215
 */
export function shikiTwoslashHighlighter({ themes } = { themes: DEFAULT_THEMES }): { highlighter: Highlighter } {
  return {
    highlighter: async (code, langToParse, metaToParse) => {
      const { meta, lang } = parseCodeFence(code, langToParse, metaToParse);
      const twoslash = meta.twoslash ? runTwoSlash(code, lang) : undefined;
      const highlighter = await loadHighlighter(themes);

      const html = themes.map(
        (themeName) => {
          return renderCodeToHTML(code, lang, meta, { themeName }, highlighter, twoslash)
        }
      ).join('');

      return escapeSvelte(html);
    }
  }
}

type Highlighter = (code: string, lang: string | undefined, metastring: string | undefined) => string | Promise<string>;

function parseCodeFence(code: string, langToParse: string | undefined, metaToParse: string | undefined) {
  try {
    const fullCodefence = [langToParse, metaToParse].join(' ').trim();
    const tokens = lex(fullCodefence);
    const lang = tokens.shift() as string;
    const meta = parse(tokens);
    return { meta, lang };
  } catch (error) {
    throw new Error(`Could not parse the codefence for this code sample \n${code}`);
  }
}

async function loadHighlighter(themes: string[]) {
  try {
    return await createShikiHighlighter({ themes });
  } catch (error) {
    console.warn(`Could not load ${themes} from shiki, using default themes: ${DEFAULT_THEMES}`);
    return await createShikiHighlighter({ themes: DEFAULT_THEMES });
  }
}