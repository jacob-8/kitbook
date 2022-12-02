// import LZString from 'lz-string';
// const { decompressFromEncodedURIComponent: decode } = LZString;

function decode(str: string) { return str };

import Dummy from './IndividualComponent.svelte';
import StoryComponent from './StoryComponent.svx';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params, parent, url }) => {
    const data = await parent();
    console.log({ file: params.file })

    // if story ID, get .svx/.md story component , otherwise get .svelte component

    const props: Record<string, any> = JSON.parse(decode(url.searchParams.get('props')));
    const storyId = url.searchParams.get('storyId');

    return { component: StoryComponent, storyId, props };
};

// export { sandboxPageLoad as load };


