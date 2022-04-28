import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        open?: boolean;
        threshold?: number;
        backdropOpacity?: number;
        speed?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        title: {};
        default: {};
    };
};
export declare type SideSheetProps = typeof __propDef.props;
export declare type SideSheetEvents = typeof __propDef.events;
export declare type SideSheetSlots = typeof __propDef.slots;
export default class SideSheet extends SvelteComponentTyped<SideSheetProps, SideSheetEvents, SideSheetSlots> {
}
export {};
