import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        error?: any;
        onError?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        before: {};
        after: {};
        default: {};
    };
};
export type CustomErrorBoundaryProps = typeof __propDef.props;
export type CustomErrorBoundaryEvents = typeof __propDef.events;
export type CustomErrorBoundarySlots = typeof __propDef.slots;
export default class CustomErrorBoundary extends SvelteComponentTyped<CustomErrorBoundaryProps, CustomErrorBoundaryEvents, CustomErrorBoundarySlots> {
}
export {};
