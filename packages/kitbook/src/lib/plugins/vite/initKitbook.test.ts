import { file_needs_copied } from './initKitbook'

test(file_needs_copied, () => {
  expect(file_needs_copied('routes/[...file]/+page.svelte')).toBeTruthy()
  expect(file_needs_copied('routes/[...file]/+page.js')).toBeTruthy()

  expect(file_needs_copied('routes/[...file]/+page.svelte.d.ts')).toBeFalsy()
  expect(file_needs_copied('sandbox/mockComponents/+page.svelte')).toBeFalsy()
  expect(file_needs_copied('_page.variants.js')).toBeFalsy()
  expect(file_needs_copied('_page.md')).toBeFalsy()
})
