import { shikiTwoslashHighlighter } from ".";
import { format as prettier } from 'prettier';
import parserHTML from 'prettier/parser-html'
import fs from 'node:fs';
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPLACE_BODY = 'REPLACE_BODY';
const REPLACE_TITLE = 'REPLACE_TITLE';
const htmlShell = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${REPLACE_TITLE} | Shiki Twoslash Test</title>
  <link rel="stylesheet" href="../tw-reset.css">
  <link rel="stylesheet" href="../shiki-twoslash.css">
  <style>
    body {
      padding: 5px;
    }
  </style>
</head>
<body>${REPLACE_BODY}</body>
</html>`

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

describe("mdsvex-shiki-twoslash", () => {
  const fixturesDirectory = resolve(_dirname, './fixtures');
  fs.readdirSync(fixturesDirectory).forEach((filename) => {
    if (!filename.includes('txt')) return;

    const name = filename.replace('.txt', '');
    test(name, async () => {
      const file = fs.readFileSync(`${fixturesDirectory}/${name}.txt`, 'utf8');
      const SPLIT = '__SPLIT__'
      const [firstLine, code] = file.replace('\r\n', SPLIT).split(SPLIT);
      const [lang, meta] = firstLine.replace(' ', SPLIT).split(SPLIT);

      const highlightedCode = await highlight(code, lang, meta);
      const htmlDocument = htmlShell.replace(REPLACE_BODY, highlightedCode).replace(REPLACE_TITLE, name);
      fs.writeFileSync(`${fixturesDirectory}/${name}.html`, htmlDocument, 'utf8');
    });
  });
});

const highlighter = shikiTwoslashHighlighter().highlighter;

async function highlight(code: string, lang?: string | undefined, meta?: string | undefined, format = true) {
  const highlighted = await highlighter(code, lang, meta);
  if (format) {
    return prettier(highlighted, {
      parser: 'html',
      plugins: [parserHTML],
    })
  }
  return highlighted
}
