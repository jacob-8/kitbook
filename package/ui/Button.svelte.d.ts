import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        onclick?: (e: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }) => any;
        href?: any;
        type?: 'button' | 'submit';
        target?: '_blank';
        size?: 'sm' | 'md' | 'lg';
        form?: 'outline' | 'filled' | 'simple' | 'link' | 'menu' | 'text';
        color?: 'red' | 'orange' | 'green' | 'black' | 'white' | 'primary';
        disabled?: boolean;
        active?: boolean;
        loading?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type ButtonProps = typeof __propDef.props;
export declare type ButtonEvents = typeof __propDef.events;
export declare type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
