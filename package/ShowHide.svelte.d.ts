/** @typedef {typeof __propDef.props}  ShowHideProps */
/** @typedef {typeof __propDef.events}  ShowHideEvents */
/** @typedef {typeof __propDef.slots}  ShowHideSlots */
export default class ShowHide extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        show: boolean;
        toggle: () => void;
    };
}> {
}
export type ShowHideProps = typeof __propDef.props;
export type ShowHideEvents = typeof __propDef.events;
export type ShowHideSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            show: boolean;
            toggle: () => void;
        };
    };
};
export {};
