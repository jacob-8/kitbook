import { dontIncludeDocFiles } from './initKitbook'

test(dontIncludeDocFiles, () => {
  expect(dontIncludeDocFiles('+page.svelte')).toBeTruthy()
  expect(dontIncludeDocFiles('+page.js')).toBeTruthy()

  expect(dontIncludeDocFiles('_page.md')).toBeFalsy()
  expect(dontIncludeDocFiles('_layout.md')).toBeFalsy()
  expect(dontIncludeDocFiles('_page.variants.js')).toBeFalsy()
  expect(dontIncludeDocFiles('+page.d.ts')).toBeFalsy()
  expect(dontIncludeDocFiles('sandbox/mockComponents/+page.svelte')).toBeFalsy()
})

