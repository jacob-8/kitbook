import type { CompositionModule, MarkdownWithCompositionsModule } from '$lib/kitbook-types'

export function splitMarkdownHtmlIntoSections({ html, pageName, compositionsModules }: { html: string; pageName: string; compositionsModules: Record<string, CompositionModule> }): { sectionedMarkdown: MarkdownWithCompositionsModule; compositionsModulesAfterInlined: Record<string, CompositionModule> } {
  let remainingHtml = html
  const sections: MarkdownWithCompositionsModule['sections'] = []

  const inlineLinksToThisPageName = new RegExp(`<p>\\[<a href="${pageName}.*?\\.composition" title="(.+?)\\.composition">(.+?)<\\/a>\]<\\/p>`, 'g')
  const inlineCompositionLinks = html.match(inlineLinksToThisPageName)
  for (const inlineLink of inlineCompositionLinks || []) {
    const index = remainingHtml.indexOf(inlineLink)
    if (index !== -1) {
      if (index > 0)
        sections.push({ html: remainingHtml.substring(0, index).trim() })

      const [,href] = inlineLink.match(/<a href="(.+?)\.composition" title="(.+?)\.composition">(.+?)<\/a>/)
      const compositionName = href.includes('.') ? href.split('.').pop() : 'default'
      compositionsModules[compositionName] = { ...compositionsModules[compositionName], inlined: true }

      sections.push({ compositionName })
      remainingHtml = remainingHtml.substring(index + inlineLink.length).trim()
    }
  }
  if (remainingHtml.length > 0)
    sections.push({ html: remainingHtml })

  return { sectionedMarkdown: { sections }, compositionsModulesAfterInlined: compositionsModules }
}

if (import.meta.vitest) {
  describe(splitMarkdownHtmlIntoSections, () => {
    test('finds default inline composition and a named one but ignores not inlined one', () => {
      const html = `<h3><a href="#linking-to-a-sub-heading">Linking to a sub-heading</a></h3>
      <p><a href="https://does-not-exeest.com/">Foam</a> supports linking to specific sections</p>
      <p>[<a href="6-easy-wikilinks.composition" title="6-easy-wikilinks.composition">6-easy-wikilinks</a>]</p>
      <p>Some more content</p>
      <p>[<a href="6-easy-wikilinks.foo.composition" title="6-easy-wikilinks.foo.composition">6-easy-wikilinks-foo</a>]</p>`
      const { sectionedMarkdown: { sections }, compositionsModulesAfterInlined } = splitMarkdownHtmlIntoSections({
        html,
        pageName: '6-easy-wikilinks',
        compositionsModules: {
          default: { default: null },
          foo: { default: undefined },
          not_inlined: { default: undefined },
        },
      })
      expect(sections).toMatchInlineSnapshot(`
        [
          {
            "html": "<h3><a href="#linking-to-a-sub-heading">Linking to a sub-heading</a></h3>
              <p><a href="https://does-not-exeest.com/">Foam</a> supports linking to specific sections</p>",
          },
          {
            "compositionName": "default",
          },
          {
            "html": "<p>Some more content</p>",
          },
          {
            "compositionName": "foo",
          },
        ]
      `)
      expect(compositionsModulesAfterInlined).toMatchInlineSnapshot(`
        {
          "default": {
            "default": null,
            "inlined": true,
          },
          "foo": {
            "default": undefined,
            "inlined": true,
          },
          "not_inlined": {
            "default": undefined,
          },
        }
      `)
    })

    test('ignores inline composition links to other page compositions', () => {
      const html = `<p>hi</p>
      <p>[<a href="some-other-page.composition" title="some-other-page.composition">some-other-page</a>]</p>
      <p>Some more content</p>`
      const { sectionedMarkdown: { sections } } = splitMarkdownHtmlIntoSections({
        html,
        pageName: 'easy-wikilinks',
        compositionsModules: null,
      })
      expect(sections[0].html).toEqual(html)
    })
  })
}
