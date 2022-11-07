import type { PageLoad } from './$types';

// type Module = () => Promise<{ [key: string]: any }>

export const load: PageLoad = async ({ params, parent }) => {
    const data = await parent();
    // console.log({ params, data })
    if (params.file) {
        const storyModulePath = data?.pages['/' + params.file].storyModulePath
        const componentModulePath = data?.pages['/' + params.file].componentModulePath
        const pageModulePath = data?.pages['/' + params.file].pageModulePath
        const variantsModulePath = data?.pages['/' + params.file].variantsModulePath

        const story = await data?.modules[storyModulePath]?.() as any
        const storyRaw = await data?.modulesRaw[storyModulePath]?.()
        const component = await data?.modules[componentModulePath]?.() as any
        const componentRaw = await data?.modulesRaw[componentModulePath]?.()
        const page = await data?.modules[pageModulePath]?.() as any
        const pageRaw = await data?.modulesRaw[pageModulePath]?.()
        const variants = await data?.modules[variantsModulePath]?.() as any
        const variantsRaw = await data?.modulesRaw[variantsModulePath]?.()

        return {
            story: story?.default,
            storyRaw,
            component: component?.default,
            componentRaw,
            page: page?.default,
            pageRaw,
            variants: variants?.variants,
            variantsRaw,
        };
    }

    if (data?.modules['/src/docs/index.md']) {
        const story = await data.modules['/src/docs/index.md']() as any
        const storyRaw = await data.modulesRaw['/src/docs/index.md']()
        return { story: story?.default, storyRaw };
    }

    // possible if allow Vite server to access one level up
    const story = await data?.modules['/README.md']() as any
    const storyRaw = await data?.modulesRaw['/README.md']()

    return { story: story?.default, storyRaw };
};