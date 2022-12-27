import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        width?: number;
        height?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type FrameBodyProps = typeof __propDef.props;
export type FrameBodyEvents = typeof __propDef.events;
export type FrameBodySlots = typeof __propDef.slots;
export default class FrameBody extends SvelteComponentTyped<FrameBodyProps, FrameBodyEvents, FrameBodySlots> {
}
export {};
