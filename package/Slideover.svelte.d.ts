/** @typedef {typeof __propDef.props}  SlideoverProps */
/** @typedef {typeof __propDef.events}  SlideoverEvents */
/** @typedef {typeof __propDef.slots}  SlideoverSlots */
export default class Slideover extends SvelteComponentTyped<{}, {
    close: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    heading: {};
    default: {};
}> {
}
export type SlideoverProps = typeof __propDef.props;
export type SlideoverEvents = typeof __propDef.events;
export type SlideoverSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        heading: {};
        default: {};
    };
};
export {};
