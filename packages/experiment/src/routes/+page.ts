import type { PageLoad } from './$types';
import { modules, storyModules } from './modules';
import { modules as virtualModules } from 'virtual:my-module'

export const load = (async () => {
  console.log({virtualModules})
  const fooModule = await modules['/src/routes/foo.variants.ts']() as { foo: string };
  const Hello = (await storyModules['/src/.kitbook/Hello.svelte']()).default;
  return { fooModule, Hello };
}) satisfies PageLoad;
