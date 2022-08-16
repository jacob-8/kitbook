
import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = () => {
  const modules = import.meta.glob('./**/*.{md,svx}');
  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
  return { stuff: { kitbook: { modules, root: '/kitbook' } } };
};
