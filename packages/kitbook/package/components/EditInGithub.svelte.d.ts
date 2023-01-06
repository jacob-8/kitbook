import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        path: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type EditInGithubProps = typeof __propDef.props;
export type EditInGithubEvents = typeof __propDef.events;
export type EditInGithubSlots = typeof __propDef.slots;
export default class EditInGithub extends SvelteComponentTyped<EditInGithubProps, EditInGithubEvents, EditInGithubSlots> {
}
export {};
