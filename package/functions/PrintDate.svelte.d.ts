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
export declare type PrintDateProps = typeof __propDef.props;
export declare type PrintDateEvents = typeof __propDef.events;
export declare type PrintDateSlots = typeof __propDef.slots;
export default class PrintDate extends SvelteComponentTyped<PrintDateProps, PrintDateEvents, PrintDateSlots> {
}
export {};
