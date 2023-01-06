import { SvelteComponentTyped } from "svelte";
import type { PageData } from './$types';
declare const __propDef: {
    props: {
        data: PageData;
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
