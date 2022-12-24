'use strict';

const fenceparser = require('fenceparser');
const shikiTwoslash = require('shiki-twoslash');
const shiki = require('shiki');
const mdsvex = require('mdsvex');

function setLineNumberBaseTo1(meta) {
  if (!meta?.highlight)
    return meta;
  const newHighlight = {};
  Object.keys(meta.highlight).forEach((key) => {
    if (key.includes("-")) {
      const [start, end] = key.split("-");
      newHighlight[`${+start - 1}-${+end - 1}`] = true;
    } else {
      newHighlight[+key - 1] = true;
    }
  });
  return { ...meta, highlight: newHighlight };
}

function shikiTwoslashHighlighter(settings = {}) {
  return {
    highlighter: async (code, langToParse, metaToParse) => {
      const { meta, lang } = parseCodefence(code, langToParse, metaToParse);
      if (hasMetaInstructingToIgnore(meta, settings.ignoreCodeblocksWithCodefenceMeta))
        return code;
      const twoslash = meta.twoslash ? shikiTwoslash.runTwoSlash(code, lang) : void 0;
      const highlighters = await loadHighlighters(settings);
      const html = renderHTML({ code, lang, meta, settings, highlighters, twoslash });
      return mdsvex.escapeSvelte(html);
    }
  };
}
function parseCodefence(code, langToParse, metaToParse) {
  try {
    const codefence = [langToParse, metaToParse].join(" ").trim();
    const [lang, ...tokens] = fenceparser.lex(codefence);
    const meta = fenceparser.parse(tokens);
    return { lang, meta };
  } catch (error) {
    throw new Error(`Could not parse the codefence for this code sample: 
${code}`);
  }
}
function hasMetaInstructingToIgnore(meta, ignoreCodeblocksWithCodefenceMeta = []) {
  return ignoreCodeblocksWithCodefenceMeta.some((key) => meta[key]);
}
const highlighterCache = /* @__PURE__ */ new Map();
async function loadHighlighters(settings) {
  if (!highlighterCache.has(settings)) {
    highlighterCache.set(settings, setupHighlightersDefinedInSettings(settings));
  }
  const highlighters = await highlighterCache.get(settings);
  return highlighters;
}
const DEFAULT_THEMES = ["dark-plus", "light-plus"];
function setupHighlightersDefinedInSettings(settings) {
  const themes = settings.themes || (settings.theme ? [settings.theme] : DEFAULT_THEMES);
  return Promise.all(
    themes.map(async (theme) => {
      const highlighter = await shiki.getHighlighter({ ...settings, theme, themes: void 0 });
      return highlighter;
    })
  );
}
function renderHTML({ code, lang, meta, settings, highlighters, twoslash }) {
  const metaWithLineNumbersBasedOn1 = twoslash ? meta : setLineNumberBaseTo1(meta);
  return highlighters.map(
    (highlighter) => {
      const themeName = highlighter.getTheme().name.split("/").pop().replace(".json", "");
      return shikiTwoslash.renderCodeToHTML(twoslash?.code || code, twoslash?.extension || lang, metaWithLineNumbersBasedOn1, { ...settings, themeName }, highlighter, twoslash);
    }
  ).join("");
}

exports.shikiTwoslashHighlighter = shikiTwoslashHighlighter;
