import type { SvelteComponent } from 'svelte';
import LZString from 'lz-string';
const { decompressFromEncodedURIComponent: decode } = LZString;
import type { GroupedPage, LoadedModules, MockedContext } from '../kitbook-types';

export const sandboxPageLoad = async ({ params, parent, url }) => {
    const { pages } = await parent();
    const page: GroupedPage = pages[params.file]; // note this doesn't have a leading slash like the (main) page param requires
    const loadedModules: LoadedModules = {}
    
    
    const storyId = url.searchParams.get('storyId') as string;
    const variantIdx = url.searchParams.get('variantIdx');
    
    let contexts: MockedContext[];
    
    if (storyId) {
        loadedModules.svx = (await page.loadSvx.loadModule() as any).default as typeof SvelteComponent;
    } else {
        loadedModules.component = (await page.loadComponent.loadModule() as any).default as typeof SvelteComponent;
    }
    
    if (variantIdx) {
        contexts = (await page.loadVariants.loadModule()).variants[variantIdx]?.contexts || [];
    }

    const props: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null);
    return { page, loadedModules, storyId, props, contexts };
};