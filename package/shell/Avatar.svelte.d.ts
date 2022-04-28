import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        user: {
            displayName: string;
            photoURL?: string;
            email: string;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type AvatarProps = typeof __propDef.props;
export declare type AvatarEvents = typeof __propDef.events;
export declare type AvatarSlots = typeof __propDef.slots;
export default class Avatar extends SvelteComponentTyped<AvatarProps, AvatarEvents, AvatarSlots> {
}
export {};
