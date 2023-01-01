import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        width?: number;
        height?: number;
        hovered?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ViewBodyProps = typeof __propDef.props;
export type ViewBodyEvents = typeof __propDef.events;
export type ViewBodySlots = typeof __propDef.slots;
export default class ViewBody extends SvelteComponentTyped<ViewBodyProps, ViewBodyEvents, ViewBodySlots> {
}
export {};
