import type { Writable } from 'svelte/store';
export interface Knobs<T> extends Writable<T> {
    fields?: {
        name: string;
        type: string;
        label?: string;
        [k: string]: any;
    }[];
}
declare const _default: <T>(cfg: any) => Knobs<T>;
export default _default;
