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
export declare type ActionSheetProps = typeof __propDef.props;
export declare type ActionSheetEvents = typeof __propDef.events;
export declare type ActionSheetSlots = typeof __propDef.slots;
export default class ActionSheet extends SvelteComponentTyped<ActionSheetProps, ActionSheetEvents, ActionSheetSlots> {
}
export {};
