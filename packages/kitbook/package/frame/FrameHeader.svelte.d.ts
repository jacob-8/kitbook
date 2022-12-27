import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title: string;
        description?: string;
        height?: number;
        width?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            adjustedHeight: number;
            adjustedWidth: number;
        };
    };
};
export type FrameHeaderProps = typeof __propDef.props;
export type FrameHeaderEvents = typeof __propDef.events;
export type FrameHeaderSlots = typeof __propDef.slots;
export default class FrameHeader extends SvelteComponentTyped<FrameHeaderProps, FrameHeaderEvents, FrameHeaderSlots> {
}
export {};
