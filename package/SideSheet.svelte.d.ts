/** @typedef {typeof __propDef.props}  SideSheetProps */
/** @typedef {typeof __propDef.events}  SideSheetEvents */
/** @typedef {typeof __propDef.slots}  SideSheetSlots */
export default class SideSheet extends SvelteComponentTyped<{
    open?: boolean;
    threshold?: number;
    backdropOpacity?: number;
    speed?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    title: {};
    default: {};
}> {
}
export type SideSheetProps = typeof __propDef.props;
export type SideSheetEvents = typeof __propDef.events;
export type SideSheetSlots = typeof __propDef.slots;
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
export {};
