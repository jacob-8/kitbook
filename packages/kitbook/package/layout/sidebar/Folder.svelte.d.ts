import { SvelteComponentTyped } from "svelte";
import type { Folder } from 'kitbook';
declare const __propDef: {
    props: {
        folder: Folder;
        activeURL: string;
        expanded?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type FolderProps = typeof __propDef.props;
export type FolderEvents = typeof __propDef.events;
export type FolderSlots = typeof __propDef.slots;
export default class Folder extends SvelteComponentTyped<FolderProps, FolderEvents, FolderSlots> {
}
export {};
