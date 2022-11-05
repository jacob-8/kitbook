const modules = import.meta.glob('./**/*.{md,svx}');

import type { LayoutLoad } from './$types';
export const load: LayoutLoad = ({url}) => {
  return { kitbook: { modules } };
};
