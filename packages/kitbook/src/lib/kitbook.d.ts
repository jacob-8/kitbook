// From https://gist.github.com/chanced/bfc4f4bfdd60077f30d0e0b043c5f81f - can remove "props" property to get all options
type SvelteComponentProps<T> = T extends abstract new (
  opts: Svelte2TsxComponentConstructorParameters<infer P>,
) => any
  ? Svelte2TsxComponentConstructorParameters<P>["props"]
  : never;

export type Variants<T> = {
  name?: string,
  description?: string,
  props: SvelteComponentProps<T>
}[]
