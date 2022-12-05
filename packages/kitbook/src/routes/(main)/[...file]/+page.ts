import type { SvelteComponent } from 'svelte';
import type { Variants } from 'kitbook';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
    const data = await parent();

    const loadedModules: {
        svx: typeof SvelteComponent;
        svxRaw: string;
        component: typeof SvelteComponent;
        componentRaw: string;
        page: typeof SvelteComponent;
        pageRaw: string;
        variants: Variants<any>;
        variantsRaw: string;
    } = {
        svx: null,
        svxRaw: null,
        component: null,
        componentRaw: null,
        page: null,
        pageRaw: null,
        variants: null,
        variantsRaw: null,
    }

    if (!data?.pages) throw new Error('No pages found, did you import layoutLoad into your Kitbook layout.ts file and do you have any +page, +layout, svelte, md, or svx files in your project?')

    const { pages } = data;
    console.log({ file: params.file })

    const page = pages['/' + params.file];

    if (page) {
        if (page.loadSvx) {
            loadedModules.svx = (await page.loadSvx.loadModule())?.default as typeof SvelteComponent;
            loadedModules.svxRaw = await page.loadSvx.loadRaw()
        }
        if (page.loadComponent) {
            loadedModules.component = (await page.loadComponent.loadModule())?.default as typeof SvelteComponent;
            loadedModules.componentRaw = await page.loadComponent.loadRaw()
        }
        if (page.loadPage) {
            loadedModules.page = (await page.loadPage.loadModule())?.default as typeof SvelteComponent;
            loadedModules.pageRaw = await page.loadPage.loadRaw()
        }
        if (page.loadVariants) {
            loadedModules.variants = (await page.loadVariants.loadModule())?.default as Variants<any>;
            loadedModules.variantsRaw = await page.loadVariants.loadRaw()
        }
        return loadedModules;
    }

    if (pages['/docs/index.md']) {
        loadedModules.svx = (await pages['/docs/index'].loadSvx.loadModule() as any)?.default as typeof SvelteComponent
        loadedModules.svxRaw = await pages['/docs/index'].loadSvx.loadRaw()
        return loadedModules;
    }

    try {
        // possible if you allow Vite server to access one level up
        loadedModules.svx = (await pages['/README.md'].loadSvx.loadModule() as any)?.default as typeof SvelteComponent
        loadedModules.svxRaw = await pages['/README.md'].loadSvx.loadRaw()
        return loadedModules;
    } catch (e) {
        console.log(e)
    }
};

// export { mainPageLoad as load };
