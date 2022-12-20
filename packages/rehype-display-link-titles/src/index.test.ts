import { rehype } from 'rehype'
import { rehypeDisplayLinkTitles } from '.'

describe('rehypeStringify', () => {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(rehypeDisplayLinkTitles)
    
  test('basic', async () => {
    const input = `<a href="https://example.com" title="Wouldn't it be nice to use the Title">Example</a>`
    expect((await processor.process(input)).value).toMatchInlineSnapshot('"<a href=\\"https://example.com\\" title=\\"Example\\">Wouldn\'t it be nice to use the Title</a>"');
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
