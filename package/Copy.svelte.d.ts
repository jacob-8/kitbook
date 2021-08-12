/** @typedef {typeof __propDef.props}  CopyProps */
/** @typedef {typeof __propDef.events}  CopyEvents */
/** @typedef {typeof __propDef.slots}  CopySlots */
export default class Copy extends SvelteComponentTyped<{
    text: string;
}, {
    copy: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        copy: () => Promise<void>;
    };
}> {
}
export type CopyProps = typeof __propDef.props;
export type CopyEvents = typeof __propDef.events;
export type CopySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text: string;
    };
    events: {
        copy: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            copy: () => Promise<void>;
        };
    };
};
export {};
