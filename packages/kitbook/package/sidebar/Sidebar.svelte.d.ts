import { SvelteComponentTyped } from "svelte";
import type { Folder as FolderType } from 'kitbook';
declare const __propDef: {
    props: {
        folder: FolderType;
        activeURL: string;
        showSidebar?: boolean;
        title?: string;
        expanded?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        footer: {};
    };
};
export type SidebarProps = typeof __propDef.props;
export type SidebarEvents = typeof __propDef.events;
export type SidebarSlots = typeof __propDef.slots;
export default class Sidebar extends SvelteComponentTyped<SidebarProps, SidebarEvents, SidebarSlots> {
}
export {};
