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
export declare type VirtualListProps = typeof __propDef.props;
export declare type VirtualListEvents = typeof __propDef.events;
export declare type VirtualListSlots = typeof __propDef.slots;
export default class VirtualList extends SvelteComponentTyped<VirtualListProps, VirtualListEvents, VirtualListSlots> {
}
export {};
