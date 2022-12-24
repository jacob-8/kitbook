import { SvelteComponentTyped } from "svelte";
declare class __sveltets_Render<T> {
    props(): {
        [x: string]: any;
        name?: string;
        id?: string;
        width?: number;
        height?: number;
        persist?: "localStorage" | "sessionStorage";
        useSandbox?: boolean;
        knobs?: T;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            props: T;
            set: (field: string, value: any) => void;
        };
    };
}
export type StoryProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export type StoryEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export type StorySlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
/**
 * Pass knobs properties (boolean, string, number, or range) to the `knobs` prop, then access values from `let:props`. Typescript provides autocompletion for the props on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.
 *
 * Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).
 *
 * Example usage: `<Story knobs={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:props={{myBool, myNum, myStr, myRange}}>`
 *
 * TODO: accept negative values for range initialValue
 *
 * TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
 */
export default class Story<T> extends SvelteComponentTyped<StoryProps<T>, StoryEvents<T>, StorySlots<T>> {
}
export {};
