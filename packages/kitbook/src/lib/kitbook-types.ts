import type { Viewport } from "@kitbook/vite-plugin-kitbook";
import type { ComponentProps, SvelteComponent } from "svelte";
import type { Page, Expect } from '@playwright/test'

export type Variants<T extends SvelteComponent> = Variant<T>[]

export type Variant<T extends SvelteComponent> = {
  name?: string,
  description?: string,
  viewports?: Viewport[];
  props?: ComponentProps<T>,
  contexts?: MockedContext[],
  /**
   * Presently only the 'default' slot is supported
   */
  slots?: Record<string, string | any>
  tests?: Record<string, Test>
}

type Test = ({page, expect, filepathWithoutExtension, name}: {
  page: Page, 
  expect: Expect, 
  filepathWithoutExtension:string,
  name: string,
}) => Promise<void>;

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
