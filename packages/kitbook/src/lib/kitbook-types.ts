import type { SvelteComponent } from "svelte";

export type Variants<T> = Variant<T>[]

export type Variant<T> = {
  name?: string,
  description?: string,
  width?: number,
  height?: number,
  props?: SvelteComponentProps<T>,
  contexts?: MockedContext[],
  slots?: Slot[]
}

type Slot = {
  // name?: string; // leave blank for default slot - dynamic slots not supported yet
  content: string | typeof SvelteComponent;
}

// From https://gist.github.com/chanced/bfc4f4bfdd60077f30d0e0b043c5f81f - can remove "props" property to get all options
type SvelteComponentProps<T> = T extends abstract new (
  opts: Svelte2TsxComponentConstructorParameters<infer P>,
) => any
  ? Svelte2TsxComponentConstructorParameters<P>["props"]
  : never;

export type MockedContext = {
  key: any,
  context: any
}

export type Folder = {
  name: string;
  url: string;
  depth: number;
  folders?: Folder[];
  pages?: GroupedPage[];
};

export type GroupedPage = PageMetadata & {
  extensions: string[];
  loadSvx?: ModuleLoadFunctions;
  loadComponent?: ModuleLoadFunctions;
  loadVariants?: ModuleLoadFunctions;
}
export type GroupedPageMap = Record<string, GroupedPage>;

export type UngroupedPage = PageMetadata & {
  ext: string;
  load: ModuleLoadFunctions;
}

type PageMetadata = {
  path: string; // allows easy link to Github
  url: string; // used as the key in GroupedPageMap
  name: string;
}

type ModuleLoadFunctions = {
  loadModule: Module;
}

export type Modules = Record<string, Module>;
// export type RawModules = Record<string, RawModule>;
type Module = () => Promise<{ [key: string]: any }>;
// type RawModule = () => Promise<string>;

export type LoadedModules = {
  svx?: typeof SvelteComponent;
  svxRaw?: string;
  component?: typeof SvelteComponent;
  componentRaw?: string;
  variants?: Variants<any>;
  variantsRaw?: string;
}