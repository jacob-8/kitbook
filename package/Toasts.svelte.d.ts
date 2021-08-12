export function toast(message: string, duration?: number): void;
/** @typedef {typeof __propDef.props}  ToastsProps */
/** @typedef {typeof __propDef.events}  ToastsEvents */
/** @typedef {typeof __propDef.slots}  ToastsSlots */
export default class Toasts extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ToastsProps = typeof __propDef.props;
export type ToastsEvents = typeof __propDef.events;
export type ToastsSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
