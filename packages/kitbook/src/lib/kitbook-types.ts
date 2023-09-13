import type { Viewport } from "@kitbook/vite-plugin-kitbook";
import type { ComponentProps, SvelteComponent } from "svelte";

export type Variants<T extends SvelteComponent> = Variant<T>[]

export type Variant<T extends SvelteComponent> = {
  name?: string,
  description?: string,
  viewports?: Viewport[];
  props?: ComponentProps<T>,
  contexts?: MockedContext[],
  slots?: Record<string, string | any>
  // 'default' or name of dynamic slot (though dynamic slots aren't supported yet)
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
