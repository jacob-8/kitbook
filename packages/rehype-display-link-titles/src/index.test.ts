import { rehype } from 'rehype'
import { rehypeDisplayLinkTitles } from '.'

// template: [Text placed inside link by default]: href "Title"
// actual:   [2-write-documentation.md#Kitbook Index]: 2-write-documentation "Write Documentation"

describe('rehypeDisplayLinkTitles', () => {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(rehypeDisplayLinkTitles)

  test('swaps link content and title (normal case)', async () => {
    const input = `<a href="docs/9-why" title="Why not use an already existing alternative?">9-why</a>`

    expect((await processor.process(input)).value).toMatchInlineSnapshot('"<a href=\\"docs/9-why\\" title=\\"9-why\\">Why not use an already existing alternative?</a>"');
  });
  
  test('removes .md extension', async () => {
    const input = `<a href="docs/9-why.md" title="Why not use an already existing alternative?">9-why</a>`

    expect((await processor.process(input)).value).toMatchInlineSnapshot('"<a href=\\"docs/9-why\\" title=\\"9-why\\">Why not use an already existing alternative?</a>"');
  });
  
  test('does not remove non .md extension', async () => {
    // if Foam changes to support other extensions this may be needed, but if GitHub works best with .md files then it is best to stick with that extension so stories and documentation can be viewed and linked to in GitHub
    const input = `<a href="docs/9-why.foo">9-why</a>`

    expect((await processor.process(input)).value).toMatchInlineSnapshot('"<a href=\\"docs/9-why.foo\\">9-why</a>"');
  });

  test('use alias after pipe instead of title if alias exists', async () => {
    const input = `<a href="docs/9-why" title="Why not use an already existing alternative?">9-why|others</a>`

    expect((await processor.process(input)).value).toMatchInlineSnapshot('"<a href=\\"docs/9-why\\" title=\\"Why not use an already existing alternative? (9-why)\\">others</a>"');
  });

  test('handle links to sections and does not enumerate slug if found again because these are just links to already existing slugs', async () => {
    // [5-easy-wikilinks#Linking to a sub-heading]: 5-easy-wikilinks "Easy Wikilinks"
    const input = `<a href="5-easy-wikilinks" title="Easy Wikilinks">5-easy-wikilinks#Linking to a sub-heading</a>`

    expect((await processor.process(input+input)).value).toMatchInlineSnapshot('"<a href=\\"5-easy-wikilinks#linking-to-a-sub-heading\\" title=\\"Easy Wikilinks (5-easy-wikilinks)\\">Linking to a sub-heading</a><a href=\\"5-easy-wikilinks#linking-to-a-sub-heading\\" title=\\"Easy Wikilinks (5-easy-wikilinks)\\">Linking to a sub-heading</a>"');
  });

  test('No title', async () => {
    const input = `<a href="https://example.com">Example</a>`
    expect((await processor.process(input)).value).eq(input);
  });

  test('No text', async () => {
    const input = `<a href="https://example.com"></a>`
    expect((await processor.process(input)).value).eq(input);
    const input2 = `<a href="https://example.com" />`
    expect((await processor.process(input2)).value).eq(input);
  });

  test('No href', async () => {
    const input = `<a>Hello</a>`
    expect((await processor.process(input)).value).eq(input);
  });
})

// TODO:  that will look like this:
