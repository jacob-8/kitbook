import { markdownToHtml } from './markdownToHtml'

describe(markdownToHtml, () => {
  // test('start', () => {
  //   const md = '# Hi'
  //   expect(markdownToHtml(md)).toMatchInlineSnapshot(`
  //     "
  //     <h1 id=\\"hi\\">Hi</h1>
  //     "
  //   `)
  // })

  const cases = import.meta.glob('./cases/*.md', { as: 'raw' })
  for (const [path, loadRaw] of Object.entries(cases)) {
    test(path.replace(/.\/cases\/(.+).md/, '$1'), async () => {
      const html = markdownToHtml(await loadRaw())
      expect(html).toMatchFileSnapshot(path.replace('.md', '.html'))
    })
  }
})
