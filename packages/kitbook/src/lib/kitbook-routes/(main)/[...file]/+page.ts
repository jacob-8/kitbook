import type { Variants } from 'kitbook';
import GetStartedSvelte from './GetStarted.svelte';
import type { PageLoad } from './$types';

// type Module = () => Promise<{ [key: string]: any }>

export const load: PageLoad = async ({ params, parent }) => {
    const data = await parent();

    if (!data?.modules) throw new Error('No modules found, did you import layoutLoad into your Kitbook layout.ts file and do you have any page, svelte, md, or svx files in your project?')

    if (!data?.pages) throw new Error('No pages found, did you import layoutLoad into your Kitbook layout.ts file and do you have any page, svelte, md, or svx files in your project?')

    const { pages, modules, modulesRaw } = data;
    const _page = pages['/' + params.file]; // todo, update page names to match modules with / or place module fetch function inside page

    if (_page) {
        const svxModulePath = _page.svxModulePath
        const svx = (await modules[svxModulePath]?.() as any)?.default as any
        const svxRaw = await modulesRaw[svxModulePath]?.()

        const componentModulePath = _page.componentModulePath
        const component = (await modules[componentModulePath]?.() as any)?.default as any
        const componentRaw = await modulesRaw[componentModulePath]?.()

        const pageModulePath = _page.pageModulePath
        const page = (await modules[pageModulePath]?.() as any)?.default as any
        const pageRaw = await modulesRaw[pageModulePath]?.()

        const variantsModulePath = _page.variantsModulePath
        const variants = (await modules[variantsModulePath]?.() as any)?.variants as Variants<any>
        const variantsRaw = await modulesRaw[variantsModulePath]?.()

        // if ()
        return {
            svx,
            svxRaw,
            component,
            componentRaw,
            page,
            pageRaw,
            variants,
            variantsRaw,
        };
    }

    if (modules['/src/docs/index.md']) {
        const svx = (await modules['/src/docs/index.md']() as any)?.default as any
        const svxRaw = await modulesRaw['/src/docs/index.md']()
        return { svx, svxRaw };
    }

    if (modules['/src/docs/index.svx']) {
        const svx = (await modules['/src/docs/index.svx']() as any)?.default as any
        const svxRaw = await modulesRaw['/src/docs/index.svx']()
        return { svx, svxRaw };
    }

    try {
        // possible if you allow Vite server to access one level up
        const svx = (await modules['/README.md']() as any)?.default as any
        const svxRaw = await modulesRaw['/README.md']()
        return { svx, svxRaw };
    } catch (e) {
        console.log(e)
    }

    return { svx: GetStartedSvelte as any };
};