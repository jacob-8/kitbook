import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        mobileShowInstruments?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        leftside: {};
        default: {};
        instruments: {};
    };
};
export type LayoutPanesProps = typeof __propDef.props;
export type LayoutPanesEvents = typeof __propDef.events;
export type LayoutPanesSlots = typeof __propDef.slots;
export default class LayoutPanes extends SvelteComponentTyped<LayoutPanesProps, LayoutPanesEvents, LayoutPanesSlots> {
}
export {};
