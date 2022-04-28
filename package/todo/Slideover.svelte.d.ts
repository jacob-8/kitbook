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
export declare type SlideoverProps = typeof __propDef.props;
export declare type SlideoverEvents = typeof __propDef.events;
export declare type SlideoverSlots = typeof __propDef.slots;
export default class Slideover extends SvelteComponentTyped<SlideoverProps, SlideoverEvents, SlideoverSlots> {
}
export {};
