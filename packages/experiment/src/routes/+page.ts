import type { PageLoad } from './$types';
import { modules, storyModules } from './modules';

export const load = (async () => {
  const fooModule = await modules['/src/routes/foo.variants.ts']() as { foo: string };
  const Hello = (await storyModules['/src/.kitbook/Hello.svelte']()).default;
  return { fooModule, Hello };
}) satisfies PageLoad;
