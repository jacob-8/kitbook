import type { SvelteComponent } from 'svelte';
import LZString from 'lz-string';
const { decompressFromEncodedURIComponent: decode } = LZString;
import type { GroupedPage, LoadedModules, Variant } from '../kitbook-types';

export const sandboxPageLoad = async ({ params, parent, url }) => {
    const { pages } = await parent();
    const page: GroupedPage = pages['/' + params.file];
    const loadedModules: LoadedModules = {}
    
    
    const storyId = url.searchParams.get('storyId') as string;
    const variantIdx = url.searchParams.get('variantIdx');
    
    if (storyId) {
        loadedModules.svx = (await page.loadSvx.loadModule() as any).default as typeof SvelteComponent;
    } else {
        loadedModules.component = (await page.loadComponent.loadModule() as any).default as typeof SvelteComponent;
    }
    
    let variant: Variant<typeof SvelteComponent>;
    if (variantIdx) {
        variant = (await page.loadVariants.loadModule()).variants[variantIdx] || {};
    }

    const editedProps: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null);
    return { page, loadedModules, storyId, variant, editedProps };
};