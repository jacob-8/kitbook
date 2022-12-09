import type { SvelteComponent } from 'svelte';
import type { GroupedPage, MockedContext } from '../kitbook-types';
import LZString from 'lz-string';
const { decompressFromEncodedURIComponent: decode } = LZString;

export const sandboxPageLoad = async ({ params, parent, url }) => {
    const { pages } = await parent();
    const page: GroupedPage = pages[params.file]; // note this doesn't have a leading slash like the (main) page param requires

    const storyId = url.searchParams.get('storyId');
    const variantIdx = url.searchParams.get('variantIdx');
    
    let component: typeof SvelteComponent;
    let contexts: MockedContext[];

    if (storyId) {
        component = (await page.loadSvx.loadModule() as any).default as typeof SvelteComponent;
    }
    if (variantIdx) {
        component = (await page.loadComponent.loadModule() as any).default as typeof SvelteComponent;
        contexts = (await page.loadVariants.loadModule())?.variants?.[variantIdx].contexts as MockedContext[] || [];
    }

    const props: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null);
    return { component, storyId, props, contexts };
};