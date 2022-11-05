import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
    const data = await parent();
    // console.log({ params, modules: data?.modules })
    // take params and find proper module to display for route
    const component = await data?.modules.svxModules['/src/docs/index.md']()
    const raw = await data?.modules.svxModulesRaw['/src/docs/index.md']()
    return { component: component?.default, raw };
};