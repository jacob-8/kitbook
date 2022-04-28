import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        strings?: string[];
        canEdit?: boolean;
        promptMessage: string;
        addMessage: string;
    };
    events: {
        valueupdated: CustomEvent<string[]>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type BadgeArrayProps = typeof __propDef.props;
export declare type BadgeArrayEvents = typeof __propDef.events;
export declare type BadgeArraySlots = typeof __propDef.slots;
export default class BadgeArray extends SvelteComponentTyped<BadgeArrayProps, BadgeArrayEvents, BadgeArraySlots> {
}
export {};
