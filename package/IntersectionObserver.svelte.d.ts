/** @typedef {typeof __propDef.props}  IntersectionObserverProps */
/** @typedef {typeof __propDef.events}  IntersectionObserverEvents */
/** @typedef {typeof __propDef.slots}  IntersectionObserverSlots */
export default class IntersectionObserver extends SvelteComponentTyped<{
    once?: boolean;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}, {
    intersected: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        intersecting: boolean;
    };
}> {
}
export type IntersectionObserverProps = typeof __propDef.props;
export type IntersectionObserverEvents = typeof __propDef.events;
export type IntersectionObserverSlots = typeof __propDef.slots;
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
        intersected: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            intersecting: boolean;
        };
    };
};
export {};
