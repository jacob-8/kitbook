export type Variants<T> = {
  name?: string,
  description?: string,
  props: SvelteComponentProps<T>
}[]

// From https://gist.github.com/chanced/bfc4f4bfdd60077f30d0e0b043c5f81f - can remove "props" property to get all options
type SvelteComponentProps<T> = T extends abstract new (
  opts: Svelte2TsxComponentConstructorParameters<infer P>,
) => any
  ? Svelte2TsxComponentConstructorParameters<P>["props"]
  : never;

export type Folder = {
  name: string;
  url: string;
  depth: number;
  folders?: Folder[];
  pages?: GroupedPage[];
};

export type UngroupedPage = PageMetadata & {
  ext: string;
  load: ModuleLoadFunctions;
}

export type GroupedPage = PageMetadata & {
  extensions: string[];
  loadSvx?: ModuleLoadFunctions;
  loadComponent?: ModuleLoadFunctions;
  loadPage?: ModuleLoadFunctions;
  loadVariants?: ModuleLoadFunctions;
}
export type GroupedPageMap = Record<string, GroupedPage>;

type PageMetadata = {
  path: string; // allows easy link to Github
  url: string; // used as the key in GroupedPageMap
  name: string;
}

type ModuleLoadFunctions = {
  loadModule: Module;
  loadRaw: RawModule;
}

type Module = () => Promise<{ [key: string]: any }>;
type RawModule = () => Promise<string>;

export type Modules = Record<string, Module>;
export type RawModules = Record<string, RawModule>;