import type { SvelteComponent } from 'svelte';
import LZString from 'lz-string';
const { decompressFromEncodedURIComponent: decode } = LZString;
import { convertUrlToModulePath } from '$lib/pages/convertUrlToPath';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params, parent, url }) => {
    const data = await parent();
    let component: typeof SvelteComponent;

    const storyId = url.searchParams.get('storyId');
    const isStory = !!storyId;
    const isVariant = !storyId;

    if (isStory) {
        const mdModulePath = convertUrlToModulePath(params.file, 'md')
        const mdModule = data.modules[mdModulePath];
        if (mdModule) {
            component = (await mdModule() as any).default as typeof SvelteComponent;
        } else {
            const svxModulePath = convertUrlToModulePath(params.file, 'svx')
            const svxModule = data.modules[svxModulePath];
            component = (await svxModule() as any).default as typeof SvelteComponent;
        }
    }
    if (isVariant) {
        const svelteModulePath = convertUrlToModulePath(params.file, 'svelte')
        const svelteModule = data.modules[svelteModulePath];
        component = (await svelteModule() as any).default as typeof SvelteComponent;
    }

    console.log({ file: params.file })

    const props: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null);
    return { component, storyId, props };
};

// export { sandboxPageLoad as load };


