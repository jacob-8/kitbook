import { convertUrlToModulePath } from "./convertUrlToPath";

test('component markdown', () => {
  const url = '/docs/0-why-kitbook';
  const path = '/src/docs/0-why-kitbook.md';
  expect(convertUrlToModulePath(url, 'md')).toBe(path);
})

test('page markdown', () => {
  const url = '/routes/c/+page';
  const path = '/src/routes/c/_page.md';
  expect(convertUrlToModulePath(url, 'md')).toBe(path);
})

test('component svx', () => {
  const url = '/lib/B';
  const path = '/src/lib/B.svx';
  expect(convertUrlToModulePath(url, 'svx')).toBe(path);
})


test('page svx', () => {
  const url = '/routes/c/+page';
  const path = '/src/routes/c/_page.svx';
  expect(convertUrlToModulePath(url, 'svx')).toBe(path);
})

test('svelte component for variant', () => {
  const url = '/lib/B';
  const path = '/src/lib/B.svelte';
  expect(convertUrlToModulePath(url, 'svelte')).toBe(path);
})

test('svelte page component for variant', () => {
  const url = '/routes/c/+page';
  const path = '/src/routes/c/+page.svelte';
  expect(convertUrlToModulePath(url, 'svelte')).toBe(path);
})

// test('findPage storyModule for a page where url has +page but storyModule is _page.svx', () => {
//   const storyModuleUrl = '/src/routes/c/+page';
//   expect(findModuleLoader(storyModuleUrl, modules)).toMatchInlineSnapshot('"docs/0-why-kitbook"');
// })

// test('findPage storyModule for a page where url has a + but story has an underscore', () => {
//   const storyModuleUrl = '/src/routes/c/+page';
//   expect(findModuleLoader(storyModuleUrl, modules)).toMatchInlineSnapshot('[Function]');
// })