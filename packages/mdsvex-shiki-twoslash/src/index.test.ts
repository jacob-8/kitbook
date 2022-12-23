import { shikiTwoslashHighlighter } from ".";
import { format as prettier } from 'prettier';
import parserHTML from 'prettier/parser-html'
import fs from 'fs';

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

describe("mdsvex-shiki-twoslash", () => {
  fs.readdirSync('./src/fixtures').forEach((file) => {
    if (!file.includes('txt')) {
      return;
    }
    const name = file.replace('.txt', '');
    test(name, async () => {
      const file = fs.readFileSync(`./src/fixtures/${name}.txt`, 'utf8');
      const SPLIT = '__SPLIT__'
      const [firstLine, code] = file.replace('\r\n', SPLIT).split(SPLIT);
      const [lang, meta] = firstLine.replace(' ', SPLIT).split(SPLIT);

      const highlightedCode = await highlight(code, lang, meta);
      const htmlDocument = htmlShell.replace(REPLACE_BODY, highlightedCode).replace(REPLACE_TITLE, name);
      fs.writeFileSync(`./src/fixtures/${name}.html`, htmlDocument, 'utf8');
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
