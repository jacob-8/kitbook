import { SvelteComponentTyped } from "svelte";
import type { Knobs } from './knobs';
declare const __propDef: {
    props: {
        knobs: Knobs<any>;
        id: string;
        persist?: 'localStorage' | 'sessionStorage';
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type KnobsProps = typeof __propDef.props;
export type KnobsEvents = typeof __propDef.events;
export type KnobsSlots = typeof __propDef.slots;
export default class Knobs extends SvelteComponentTyped<KnobsProps, KnobsEvents, KnobsSlots> {
}
export {};
