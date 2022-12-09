import type { SvelteComponent } from 'svelte';
import type { GroupedPage, LoadedModules, Variants } from '../kitbook-types';

export const mainPageLoad = async ({ params, parent }) => {
    const { pages } = await parent();
    const page: GroupedPage = pages['/' + params.file];
    const loadedModules: LoadedModules = {}

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
            loadedModules.variants = (await page.loadVariants.loadModule())?.variants as Variants<any>;
            loadedModules.variantsRaw = await page.loadVariants.loadRaw()
        }
        return { page, loadedModules };
    }

    if (pages['/docs/index']) {
        loadedModules.svx = (await pages['/docs/index'].loadSvx.loadModule() as any)?.default as typeof SvelteComponent
        loadedModules.svxRaw = await pages['/docs/index'].loadSvx.loadRaw()
        return { page, loadedModules };
    }

    try {
        // requires allowing Vite server to access one level up from project root (/src)
        loadedModules.svx = (await pages['/README'].loadSvx.loadModule() as any)?.default as typeof SvelteComponent
        loadedModules.svxRaw = await pages['/README'].loadSvx.loadRaw()
        return { page, loadedModules };
    } catch (e) {
        console.log(e)
    }
};
