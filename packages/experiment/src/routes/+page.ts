import type { PageLoad } from './$types';
import { modules } from './modules';

export const load = (async () => {
  const fooModule = await modules['/src/routes/foo.variants.ts']();
  return { fooModule };
}) satisfies PageLoad;