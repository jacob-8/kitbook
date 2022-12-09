import type { SvelteComponent } from 'svelte';
import LZString from 'lz-string';
const { decompressFromEncodedURIComponent: decode } = LZString;

export const sandboxPageLoad = async ({ params, parent, url }) => {
    const data = await parent();
    const { pages } = data;
    const page = pages[params.file]; // note this doesn't have a leading slash like the (main) page param requires

    let component: typeof SvelteComponent;

    const storyId = url.searchParams.get('storyId');
    const isStory = !!storyId;
    const isVariant = !storyId;

    if (isStory) {
        component = (await page.loadSvx.loadModule() as any).default as typeof SvelteComponent;
    }
    if (isVariant) {
        component = (await page.loadComponent.loadModule() as any).default as typeof SvelteComponent;
    }

    const props: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null);
    return { component, storyId, props };
};