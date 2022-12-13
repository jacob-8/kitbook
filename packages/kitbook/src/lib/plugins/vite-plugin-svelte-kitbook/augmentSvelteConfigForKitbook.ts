import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import { immutableDeepMerge } from './utils/immutableDeepMerge.js';
import type { Config } from '@sveltejs/kit';

export function augmentSvelteConfigForKitbook(config: Config) {
  if (!process.env.KITBOOK) return config;

  const kitbookOptions: Config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    kit: {
      files: {
        routes: 'src/kitbook'
      },
      outDir: '.svelte-kit-kitbook'
    }
  }
  config = immutableDeepMerge(config, kitbookOptions);
  config.preprocess = appendMdsvexPreprocessor(config.preprocess);
  return config;
}

function appendMdsvexPreprocessor(preprocessors: any) {
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
    expect(appendMdsvexPreprocessor(undefined)).toMatchInlineSnapshot(`
      [
        {
          "markup": [Function],
        },
      ]
    `);
  });

  const otherPreprocessor = () => { return { script: () => {} } };

  test('appendMdsvexPreprocessor handles a prior array of preprocessors', () => {
    expect(appendMdsvexPreprocessor([otherPreprocessor()])).toMatchInlineSnapshot(`
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
    expect(appendMdsvexPreprocessor(otherPreprocessor())).toMatchInlineSnapshot(`
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

