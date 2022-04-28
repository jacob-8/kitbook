import { SvelteComponentTyped } from "svelte";
export declare function toast(message: string, duration?: number): void;
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ToastsProps = typeof __propDef.props;
export declare type ToastsEvents = typeof __propDef.events;
export declare type ToastsSlots = typeof __propDef.slots;
export default class Toasts extends SvelteComponentTyped<ToastsProps, ToastsEvents, ToastsSlots> {
}
export {};
