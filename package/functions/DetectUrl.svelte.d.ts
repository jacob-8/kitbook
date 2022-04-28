import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        string: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            display: string;
            href: string;
        };
    };
};
export declare type DetectUrlProps = typeof __propDef.props;
export declare type DetectUrlEvents = typeof __propDef.events;
export declare type DetectUrlSlots = typeof __propDef.slots;
export default class DetectUrl extends SvelteComponentTyped<DetectUrlProps, DetectUrlEvents, DetectUrlSlots> {
}
export {};
