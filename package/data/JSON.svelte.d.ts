/** @typedef {typeof __propDef.props}  JsonProps */
/** @typedef {typeof __propDef.events}  JsonEvents */
/** @typedef {typeof __propDef.slots}  JsonSlots */
export default class Json extends SvelteComponentTyped<{
    obj: Record<string, any>;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type JsonProps = typeof __propDef.props;
export type JsonEvents = typeof __propDef.events;
export type JsonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        obj: Record<string, any>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
