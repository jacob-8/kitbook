/** @typedef {typeof __propDef.props}  PrintDateProps */
/** @typedef {typeof __propDef.events}  PrintDateEvents */
/** @typedef {typeof __propDef.slots}  PrintDateSlots */
export default class PrintDate extends SvelteComponentTyped<{
    date: Date;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PrintDateProps = typeof __propDef.props;
export type PrintDateEvents = typeof __propDef.events;
export type PrintDateSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        date: Date;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
