import { markdownToHtml } from './markdownToHtml'

describe(markdownToHtml, () => {
  const cases = import.meta.glob('./cases/*.md', { as: 'raw' })
  for (const [path, loadRaw] of Object.entries(cases)) {
    const testName = path.replace(/.\/cases\/(.+).md/, '$1')
    test(testName, async () => {
      const html = await markdownToHtml(await loadRaw())
      expect(html).toMatchFileSnapshot(path.replace('.md', '.html'))
    })
  }
})
