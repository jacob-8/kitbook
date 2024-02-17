import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import parserHTML from 'prettier/parser-html'
import { format as prettier } from 'prettier'
import { shikiTwoslashHighlighter } from '.'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

describe('mdsvex-shiki-twoslash', () => {
  const fixturesDirectory = resolve(_dirname, './fixtures')
  fs.readdirSync(fixturesDirectory).forEach((filename) => {
    if (!filename.includes('txt'))
      return

    const name = filename.replace('.txt', '')
    test(name, async () => {
      const fileContents = fs.readFileSync(`${fixturesDirectory}/${name}.txt`, 'utf8')
      const normalizedContents = fileContents.replace(/\r\n/g, '\n') // Replace CRLF with LF
      const SPLIT = '__SPLIT__'
      const [firstLine, code] = normalizedContents.replace('\n', SPLIT).split(SPLIT)
      const [lang, meta] = firstLine.replace(' ', SPLIT).split(SPLIT)
      const highlightedCode = await highlight(code, lang, meta)
      expect(highlightedCode).toMatchFileSnapshot(`${fixturesDirectory}/${name}.html`)
    })
  })
})

const highlighter = shikiTwoslashHighlighter().highlighter

async function highlight(code: string, lang?: string | undefined, meta?: string | undefined, format = false) {
  const highlighted = await highlighter(code, lang, meta)
  if (format) {
    return prettier(highlighted, {
      parser: 'html',
      plugins: [parserHTML],
    })
  }
  return highlighted
}
