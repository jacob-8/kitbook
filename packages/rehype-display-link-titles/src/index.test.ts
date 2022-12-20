import { rehype } from 'rehype'
import { rehypeDisplayLinkTitles } from '.'

describe('rehypeStringify', () => {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(rehypeDisplayLinkTitles)
    
  test('swaps link content and title (normal case)', async () => {
    const input = `<a href="docs/9-why" title="Why not use an already existing alternative?">9-why</a>`

    expect((await processor.process(input)).value).toMatchInlineSnapshot('"<a href=\\"docs/9-why\\" title=\\"9-why\\">Why not use an already existing alternative?</a>"');
  });

  test('use alias after pipe instead of title if alias exists', async () => {
    const input = `<a href="docs/9-why" title="Why not use an already existing alternative?">9-why|others</a>`

    expect((await processor.process(input)).value).toMatchInlineSnapshot('"<a href=\\"docs/9-why\\" title=\\"Why not use an already existing alternative? (9-why)\\">others</a>"');
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
