import { SvelteComponentTyped } from "svelte";
declare class __sveltets_Render<T> {
    props(): {
        startWith?: T;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            set: (this: void, value: T) => void;
            store: T;
        };
    };
}
export declare type StoreProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export declare type StoreEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export declare type StoreSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
/** Example of how to document a component */
export default class Store<T> extends SvelteComponentTyped<StoreProps<T>, StoreEvents<T>, StoreSlots<T>> {
}
export {};
