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

    const indexPage = pages['/docs/index'] as GroupedPage;
    if (indexPage) {
        loadedModules.svx = (await indexPage.loadSvx.loadModule() as any)?.default as typeof SvelteComponent
        loadedModules.svxRaw = await indexPage.loadSvx.loadRaw()
        return { page: indexPage, loadedModules };
    }

    const readmePage = pages['/README'] as GroupedPage;
    // requires allowing Vite server to access one level up from project root (/src)
    if (readmePage) {
        loadedModules.svx = (await readmePage.loadSvx.loadModule() as any)?.default as typeof SvelteComponent
        loadedModules.svxRaw = await readmePage.loadSvx.loadRaw()
        return { page: readmePage, loadedModules };
    }

    return { page: { path: 'unknown' } as GroupedPage, loadedModules };
};
