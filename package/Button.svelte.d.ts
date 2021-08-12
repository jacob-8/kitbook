/** @typedef {typeof __propDef.props}  ButtonProps */
/** @typedef {typeof __propDef.events}  ButtonEvents */
/** @typedef {typeof __propDef.slots}  ButtonSlots */
export default class Button extends SvelteComponentTyped<{
    [x: string]: any;
    onclick?: () => any;
    href?: any;
    type?: "button" | "submit";
    target?: "" | "_blank";
    size?: "sm" | "md" | "lg";
    form?: "primary" | "outline" | "simple";
    color?: "red" | "orange" | "green" | "black" | "white";
    disabled?: boolean;
    loading?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        onclick?: () => any;
        href?: any;
        type?: "button" | "submit";
        target?: "" | "_blank";
        size?: "sm" | "md" | "lg";
        form?: "primary" | "outline" | "simple";
        color?: "red" | "orange" | "green" | "black" | "white";
        disabled?: boolean;
        loading?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
