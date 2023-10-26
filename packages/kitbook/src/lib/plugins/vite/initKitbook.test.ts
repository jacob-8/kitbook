import { excludeDocFiles } from './initKitbook'

test(excludeDocFiles, () => {
  expect(excludeDocFiles('+page.svelte')).toBeTruthy()
  expect(excludeDocFiles('+page.js')).toBeTruthy()

  expect(excludeDocFiles('_page.svelte')).toBeFalsy()
  expect(excludeDocFiles('_layout.svelte')).toBeFalsy()
  expect(excludeDocFiles('_page.variants.js')).toBeFalsy()
  expect(excludeDocFiles('+page.d.ts')).toBeFalsy()
  expect(excludeDocFiles('sandbox/mockComponents/+page.svelte')).toBeFalsy()
})
