/** @typedef {typeof __propDef.props}  VirtualListProps */
/** @typedef {typeof __propDef.events}  VirtualListEvents */
/** @typedef {typeof __propDef.slots}  VirtualListSlots */
export default class VirtualList extends SvelteComponentTyped<{
    items: any;
    height?: string;
    itemHeight?: any;
    start?: number;
    end?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        item: any;
        index: number;
    };
}> {
}
export type VirtualListProps = typeof __propDef.props;
export type VirtualListEvents = typeof __propDef.events;
export type VirtualListSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        items: any;
        height?: string;
        itemHeight?: any;
        start?: number;
        end?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            item: any;
            index: number;
        };
    };
};
export {};
