import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title: string;
        description?: string;
        height?: number;
        width?: number;
        useIframe: boolean;
        src: string;
    };
    events: {
        refresh: CustomEvent<boolean>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            adjustedHeight: number;
            adjustedWidth: number;
        };
    };
};
export type ViewHeaderProps = typeof __propDef.props;
export type ViewHeaderEvents = typeof __propDef.events;
export type ViewHeaderSlots = typeof __propDef.slots;
export default class ViewHeader extends SvelteComponentTyped<ViewHeaderProps, ViewHeaderEvents, ViewHeaderSlots> {
}
export {};
