import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        user?: IUser;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        left: {};
    };
};
export declare type HeaderProps = typeof __propDef.props;
export declare type HeaderEvents = typeof __propDef.events;
export declare type HeaderSlots = typeof __propDef.slots;
export default class Header extends SvelteComponentTyped<HeaderProps, HeaderEvents, HeaderSlots> {
}
export {};
