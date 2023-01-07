import type { SvelteComponent } from 'svelte';
import type { GroupedPage, LoadedModules, Variant } from '../kitbook-types';
export declare const sandboxPageLoad: ({ params, parent, url }: {
    params: any;
    parent: any;
    url: any;
}) => Promise<{
    page: GroupedPage;
    pageKey: string;
    loadedModules: LoadedModules;
    storyId: string;
    variant: Variant<typeof SvelteComponent>;
    variantIdx: any;
    editedProps: Record<string, any>;
}>;
