/** @typedef {typeof __propDef.props}  ActionSheetProps */
/** @typedef {typeof __propDef.events}  ActionSheetEvents */
/** @typedef {typeof __propDef.slots}  ActionSheetSlots */
export default class ActionSheet extends SvelteComponentTyped<{
    fullscreen?: boolean;
    open?: boolean;
    threshold?: number;
    backdropOpacity?: number;
    speed?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ActionSheetProps = typeof __propDef.props;
export type ActionSheetEvents = typeof __propDef.events;
export type ActionSheetSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        fullscreen?: boolean;
        open?: boolean;
        threshold?: number;
        backdropOpacity?: number;
        speed?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
