import { UserConfigSettings } from 'shiki-twoslash';

/**
 * Default themes found here: https://www.runpkg.com/?shiki@0.12.1/themes/dark-plus.json
 * Does not support using ```twoslash include foo... as described in https://shikijs.github.io/twoslash/ - not sure if this is possible with MDSvex as the MDSvex highlighter works on a code block by code block basis and not file by file as a remark plugin would (i.e. remark-shiki-twoslash)
 * @src https://github.com/shikijs/twoslash/blob/main/packages/remark-shiki-twoslash/README.md
 * @src https://github.com/shikijs/twoslash/blob/main/packages/shiki-twoslash/README.md
 * @src Initially inspired by https://github.com/pngwn/MDsveX/issues/212#issuecomment-937574889
 */
declare function shikiTwoslashHighlighter(settings?: UserConfigSettings): {
    highlighter: MDSvexHighlighter;
};
type MDSvexHighlighter = (code: string, lang: string | undefined, metastring: string | undefined) => string | Promise<string>;

export { shikiTwoslashHighlighter };
