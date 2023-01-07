import { SvelteComponentTyped } from "svelte";
import { page } from '$app/stores';
import type { GroupedPage, GroupedPageMap, LoadedModules } from '../kitbook-types';
declare const __propDef: {
    props: {
        data?: {
            pages?: GroupedPageMap;
            page?: GroupedPage;
            pageKey?: string;
            loadedModules?: LoadedModules;
            error?: string;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MainPageProps = typeof __propDef.props;
export type MainPageEvents = typeof __propDef.events;
export type MainPageSlots = typeof __propDef.slots;
export default class MainPage extends SvelteComponentTyped<MainPageProps, MainPageEvents, MainPageSlots> {
}
export {};
