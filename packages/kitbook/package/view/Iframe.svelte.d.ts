import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        props: any;
        queryParams: string;
        reload?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IframeProps = typeof __propDef.props;
export type IframeEvents = typeof __propDef.events;
export type IframeSlots = typeof __propDef.slots;
export default class Iframe extends SvelteComponentTyped<IframeProps, IframeEvents, IframeSlots> {
    get reload(): () => void;
}
export {};
