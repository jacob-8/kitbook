import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            show: boolean;
            toggle: () => void;
            set: (value: boolean) => void;
        };
    };
};
export declare type ShowHideProps = typeof __propDef.props;
export declare type ShowHideEvents = typeof __propDef.events;
export declare type ShowHideSlots = typeof __propDef.slots;
export default class ShowHide extends SvelteComponentTyped<ShowHideProps, ShowHideEvents, ShowHideSlots> {
}
export {};
