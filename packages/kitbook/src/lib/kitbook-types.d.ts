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
  pages?: Page[];
};

export type Page = {
  name: string;
  url: string;
  ext?: string;
  path?: string;
  // organize sibling modules into 1 page, show stories/docs first, then default component view, then variants
  svxModulePath?: string;
  componentModulePath?: string;
  pageModulePath?: string;
  variantsModulePath?: string;
};
export type PageMap = Record<string, Page>;

type Module = () => Promise<{ [key: string]: any }>;
export type Modules = Record<string, Module>;