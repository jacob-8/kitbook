export function convertUrlToModulePath(url: string, extension: 'md' | 'svx' | 'svelte' = 'svelte'): string {
  let path = extension === 'svelte' ? url : url.replace('/+page', '/_page');
  return `/src${path}.${extension}`;
}