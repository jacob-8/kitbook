import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

type SvelteImport = () => Promise<{ default: typeof SvelteComponent }>;

export const updatedModules = writable({});
export const updatedStories = writable<Record<string, SvelteImport>>({});
