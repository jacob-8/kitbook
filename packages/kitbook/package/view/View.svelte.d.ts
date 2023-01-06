import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title: string;
        description?: string;
        width: number;
        height?: number;
        useIframe?: boolean;
        hovered?: boolean;
        props: any;
        queryParams: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ViewProps = typeof __propDef.props;
export type ViewEvents = typeof __propDef.events;
export type ViewSlots = typeof __propDef.slots;
export default class View extends SvelteComponentTyped<ViewProps, ViewEvents, ViewSlots> {
}
export {};
