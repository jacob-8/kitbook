import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        headings?: {
            title: string;
            key: string;
        }[];
        value: string;
    };
    events: {
        change: CustomEvent<{
            value: string;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type SwitcherProps = typeof __propDef.props;
export declare type SwitcherEvents = typeof __propDef.events;
export declare type SwitcherSlots = typeof __propDef.slots;
export default class Switcher extends SvelteComponentTyped<SwitcherProps, SwitcherEvents, SwitcherSlots> {
}
export {};
