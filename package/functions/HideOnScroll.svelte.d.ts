import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        duration?: string;
        offset?: number;
        tolerance?: number;
        zIndex?: number;
        direction?: 'up' | 'down';
        bottom?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type HideOnScrollProps = typeof __propDef.props;
export declare type HideOnScrollEvents = typeof __propDef.events;
export declare type HideOnScrollSlots = typeof __propDef.slots;
export default class HideOnScroll extends SvelteComponentTyped<HideOnScrollProps, HideOnScrollEvents, HideOnScrollSlots> {
}
export {};
