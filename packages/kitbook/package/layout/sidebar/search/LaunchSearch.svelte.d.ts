import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type LaunchSearchProps = typeof __propDef.props;
export type LaunchSearchEvents = typeof __propDef.events;
export type LaunchSearchSlots = typeof __propDef.slots;
export default class LaunchSearch extends SvelteComponentTyped<LaunchSearchProps, LaunchSearchEvents, LaunchSearchSlots> {
}
export {};
