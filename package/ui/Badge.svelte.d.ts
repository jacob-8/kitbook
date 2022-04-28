import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        onclick?: (e: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }) => any;
        onx?: (e: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }) => any;
        href?: any;
        target?: '_blank' | '';
        size?: 'sm' | 'lg';
        color?: 'red' | 'orange' | 'green' | 'gray' | string;
        active?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type BadgeProps = typeof __propDef.props;
export declare type BadgeEvents = typeof __propDef.events;
export declare type BadgeSlots = typeof __propDef.slots;
export default class Badge extends SvelteComponentTyped<BadgeProps, BadgeEvents, BadgeSlots> {
}
export {};
