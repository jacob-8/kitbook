import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        strings?: string[];
        canEdit?: boolean;
        addMessage: string;
    };
    events: {
        itemclicked: CustomEvent<{
            value: string;
            index: number;
        }>;
        itemremoved: CustomEvent<{
            value: string;
            index: number;
        }>;
        additem: CustomEvent<boolean>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type BadgeArrayEmitProps = typeof __propDef.props;
export declare type BadgeArrayEmitEvents = typeof __propDef.events;
export declare type BadgeArrayEmitSlots = typeof __propDef.slots;
export default class BadgeArrayEmit extends SvelteComponentTyped<BadgeArrayEmitProps, BadgeArrayEmitEvents, BadgeArrayEmitSlots> {
}
export {};
