import LZString from 'lz-string';
const { decompressFromEncodedURIComponent: decode } = LZString;

import IndividualComponent from './IndividualComponent.svelte';
import StoryComponent from './StoryComponent.svx';

import type { SvelteComponent } from 'svelte';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params, parent, url }) => {
    const data = await parent();
    let component: typeof SvelteComponent

    const storyId = url.searchParams.get('storyId');
    const isStory = !!storyId;
    const isVariant = !storyId;

    if (isStory) {
        component = StoryComponent;
        // get matching .svx/.md stories component
        // file = '/src/routes/sandbox/[...file]/+page'
        // '/src/routes/sandbox/[...file]/_page.svx': [Function: /src/routes/sandbox/[...file]/_page.svx],
    }
    if (isVariant) {
        component = IndividualComponent;
        // get matching .svelte component
        // file = '/src/routes/sandbox/[...file]/+page'
        // '/src/routes/sandbox/[...file]/+page.svelte': [Function: /src/routes/sandbox/[...file]/+page.svelte],
    }

    console.log({ file: params.file })
    // console.log({ modules: data.modules })

    const props: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')) || null);
    return { component, storyId, props };
};

// export { sandboxPageLoad as load };


