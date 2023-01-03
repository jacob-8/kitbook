import { SvelteComponentTyped } from "svelte";
import type { GroupedPage } from '../../kitbook-types';
declare const __propDef: {
    props: {
        page: GroupedPage;
        activeURL: string;
        depth: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PageProps = typeof __propDef.props;
export type PageEvents = typeof __propDef.events;
export type PageSlots = typeof __propDef.slots;
export default class Page extends SvelteComponentTyped<PageProps, PageEvents, PageSlots> {
}
export {};
