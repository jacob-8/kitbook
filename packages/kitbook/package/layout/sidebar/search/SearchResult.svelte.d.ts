import { SvelteComponentTyped } from "svelte";
import type { GroupedPage } from '../../../kitbook-types';
declare const __propDef: {
    props: {
        page: GroupedPage;
        active?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SearchResultProps = typeof __propDef.props;
export type SearchResultEvents = typeof __propDef.events;
export type SearchResultSlots = typeof __propDef.slots;
export default class SearchResult extends SvelteComponentTyped<SearchResultProps, SearchResultEvents, SearchResultSlots> {
}
export {};
