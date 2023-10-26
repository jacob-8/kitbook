import fs from 'node:fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import remarkRehype from 'remark-rehype'

import rehypeStringify from 'rehype-stringify'
import rehypeFormat from 'rehype-format'
import { readSync, writeSync } from 'to-vfile'

const processor = unified()
  .use(remarkParse)
  .use(remarkSlug)
  .use(remarkToc)
  .use(remarkRehype)
  .use(rehypeFormat)
  .use(rehypeStringify)

export async function processHere(filePath: string): Promise<string | Buffer> {
  const file = fs.readFileSync(filePath, 'utf-8')
  return (await processor.process(file)).value
}

export async function processToFileBeside(filePath: string): Promise<void> {
  return processor
    .process(readSync(filePath))
    .then(
      (file) => {
        file.extname = '.html'
        writeSync(file)
      },
      (error) => {
        throw error
      },
    )
}
