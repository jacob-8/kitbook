import { SvelteComponentTyped } from "svelte";
import { type SvelteComponent } from 'svelte';
import type { GroupedPage, GroupedPageMap, LoadedModules, Variant } from '../kitbook-types';
declare const __propDef: {
    props: {
        data: {
            pages: GroupedPageMap;
            page: GroupedPage;
            pageKey: string;
            loadedModules: LoadedModules;
            storyId: string;
            variant?: Variant<typeof SvelteComponent>;
            variantIdx?: string;
            editedProps?: Record<string, any>;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SandboxPageProps = typeof __propDef.props;
export type SandboxPageEvents = typeof __propDef.events;
export type SandboxPageSlots = typeof __propDef.slots;
export default class SandboxPage extends SvelteComponentTyped<SandboxPageProps, SandboxPageEvents, SandboxPageSlots> {
}
export {};
