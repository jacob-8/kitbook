import { mdsvex, type MdsvexOptions } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

export function appendMdsvexPreprocessor(preprocessors: any, mdsvexConfig: MdsvexOptions) {
  if (!preprocessors) {
    return [mdsvex(mdsvexConfig)];
  } else if (Array.isArray(preprocessors)) {
    return [mdsvex(mdsvexConfig), ...preprocessors];
  } else {
    return [mdsvex(mdsvexConfig), preprocessors];
  }
}

if (import.meta.vitest) {
  test('appendMdsvexPreprocessor handles no prior existing preprocessors', () => {
    expect(appendMdsvexPreprocessor(undefined, mdsvexConfig)).toMatchInlineSnapshot(`
      [
        {
          "markup": [Function],
        },
      ]
    `);
  });

  const otherPreprocessor = () => { return { script: () => { } }; };

  test('appendMdsvexPreprocessor handles a prior array of preprocessors', () => {
    expect(appendMdsvexPreprocessor([otherPreprocessor()], mdsvexConfig)).toMatchInlineSnapshot(`
      [
        {
          "markup": [Function],
        },
        {
          "script": [Function],
        },
      ]
    `);
  });

  test('appendMdsvexPreprocessor handles a single preprocessor', () => {
    expect(appendMdsvexPreprocessor(otherPreprocessor(), mdsvexConfig)).toMatchInlineSnapshot(`
      [
        {
          "markup": [Function],
        },
        {
          "script": [Function],
        },
      ]
    `);
  });
}
