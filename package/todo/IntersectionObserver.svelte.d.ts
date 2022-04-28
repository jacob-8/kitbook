import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        once?: boolean;
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    events: {
        intersected: CustomEvent<null>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            intersecting: boolean;
        };
    };
};
export declare type IntersectionObserverProps = typeof __propDef.props;
export declare type IntersectionObserverEvents = typeof __propDef.events;
export declare type IntersectionObserverSlots = typeof __propDef.slots;
export default class IntersectionObserver extends SvelteComponentTyped<IntersectionObserverProps, IntersectionObserverEvents, IntersectionObserverSlots> {
}
export {};
