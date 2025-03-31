import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
  const { parsed_module_sets: parsed_modules } = await parent()
  const page_key = parse_page_key(params?.file)
  return { page_key };
}) satisfies PageLoad;

function parse_page_key(input: string) {
  return input || 'HOME'
}

if (import.meta.vitest) {
  describe(parse_page_key, () => {
    test('does not change param', () => {
      const key = '/docs/1-get-started'
      expect(parse_page_key(key)).toEqual(key)
    })
    test('handles undefined with just HOME', () => {
      expect(parse_page_key(null)).toEqual('HOME')
    })
  })
}