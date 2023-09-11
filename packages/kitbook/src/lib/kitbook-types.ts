import type { ComponentProps, SvelteComponent } from "svelte";

export interface KitbookSettings {
  title: string;
  description: string;
  viewports: Viewport[];
  languages?: Language[];
  expandTree?: boolean;
  githubURL?: string;
}

export type Viewport = {
  name?: string;
  width: number;
  height: number;
}

export type Language = {
  name: string;
  code: string;
}

export type Variants<T extends SvelteComponent> = Variant<T>[]

export type Variant<T extends SvelteComponent> = {
  name?: string,
  description?: string,
  viewports?: Viewport[];
  props?: ComponentProps<T>,
  contexts?: MockedContext[],
  slots?: Slot[]
}

type Slot = {
  // name?: string; // leave blank for default slot - dynamic slots not supported yet
  content: string | typeof SvelteComponent;
}

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
  loadRaw: RawModule;
}

export type Modules = Record<string, Module>;
export type RawModules = Record<string, RawModule>;
type Module = () => Promise<{ [key: string]: any }>;
type RawModule = () => Promise<string>;

export type LoadedModules = {
  svx?: typeof SvelteComponent;
  svxRaw?: string;
  component?: typeof SvelteComponent;
  componentRaw?: string;
  variants?: Variants<any>;
  variantsRaw?: string;
}
