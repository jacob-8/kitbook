/** @typedef {typeof __propDef.props}  MultiSelectProps */
/** @typedef {typeof __propDef.events}  MultiSelectEvents */
/** @typedef {typeof __propDef.slots}  MultiSelectSlots */
export default class MultiSelect extends SvelteComponentTyped<{
    value?: any[];
    readonly?: boolean;
    placeholder?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type MultiSelectProps = typeof __propDef.props;
export type MultiSelectEvents = typeof __propDef.events;
export type MultiSelectSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: any[];
        readonly?: boolean;
        placeholder?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
