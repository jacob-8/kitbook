import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        close: CustomEvent<boolean>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SearchModalProps = typeof __propDef.props;
export type SearchModalEvents = typeof __propDef.events;
export type SearchModalSlots = typeof __propDef.slots;
export default class SearchModal extends SvelteComponentTyped<SearchModalProps, SearchModalEvents, SearchModalSlots> {
}
export {};
