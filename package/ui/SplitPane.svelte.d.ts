import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        type?: 'vertical' | 'horizontal';
        pos?: number;
        fixed?: boolean;
        buffer?: number;
        min?: number;
        max?: number;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        a: {};
        b: {};
    };
};
export declare type SplitPaneProps = typeof __propDef.props;
export declare type SplitPaneEvents = typeof __propDef.events;
export declare type SplitPaneSlots = typeof __propDef.slots;
export default class SplitPane extends SvelteComponentTyped<SplitPaneProps, SplitPaneEvents, SplitPaneSlots> {
}
export {};
