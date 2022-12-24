import { SvelteComponentTyped } from "svelte";
import '@kitbook/mdsvex-shiki-twoslash/shiki-twoslash.css';
import '../styles/main.css';
declare const __propDef: {
    props: {
        title?: string;
        description?: string;
        expanded?: boolean;
        githubURL?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        title: {};
        footer: {};
        default: {};
    };
};
export type LayoutProps = typeof __propDef.props;
export type LayoutEvents = typeof __propDef.events;
export type LayoutSlots = typeof __propDef.slots;
export default class Layout extends SvelteComponentTyped<LayoutProps, LayoutEvents, LayoutSlots> {
}
export {};
