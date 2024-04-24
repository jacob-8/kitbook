# Refactor Deprecated Variants

If you used Kitbook before `v1.0.0-beta.26` then if you read the release notes you noticed the [Variants API was simplified](https://github.com/jacob-8/kitbook/releases/tag/v1.0.0-beta.26). The old api still works, you'll just need to find-replace `Variant` for `DeprecatedVariant` to fix the type errors that are now everywhere.

As you have time though, you should refactor your `variants.ts` files to use the new api as the old will disappear in a future major version. To help with the refactoring, I've put together a one-shot prompt you can use with [GPT4](https://chat.openai.com/?model=gpt-4) or [Llama3](https://groq.com/) or other LLM of choice. Your mileage may mary, and if you often use more obscure fields consider also updating the one-shot example to use them, even though they are all listed in the types here. Read through the prompt below to understand it with the nice formatting, then use the link at the bottom to get the source markdown in GitHub.

## LLM Prompt

I need help refactoring my `variants.ts` files according to recent api changes. My file is currently working on `DeprecatedVariantsModule` and I want you to refactor it to be like the `VariantModule` type defined in the `kitbook.ts` file. I'll give you an `old.variants.ts` file that I've already refactored to `new.variants.ts` so you can learn how to do it. Then please refactor my `todo.variants.ts` file for me.

Here's my types:

```ts title="kitbook.ts"
import type { ComponentProps } from 'svelte'

export interface VariantsModule {
  shared_meta?: VariantMeta
  [key: string]: Variant<any>
}

export interface VariantMeta {
  description?: string
  viewports?: Viewport[]
  languages?: Language[]
  contexts?: MockedContext[]
  slot?: string | any
  csr?: false
  ssr?: false
  tests?: {
    skip?: boolean
    additional?: Record<string, Test>
    clientSideRendered?: boolean
  }
}

export type Variant<T extends SvelteComponent> = { _meta?: VariantMeta } & ComponentProps<T>

export interface DeprecatedVariantsModule {
  variants: DeprecatedVariant<any>[]
  viewports?: Viewport[]
  languages?: Language[]
}

export interface DeprecatedVariant<T extends SvelteComponent> {
  name?: string
  description?: string
  viewports?: Viewport[]
  languages?: Language[]
  props?: ComponentProps<T>
  contexts?: MockedContext[]
  /** only the 'default' slot is supported */
  slots?: Record<string, string | any>
  tests?: {
    skip?: boolean
    additional?: Record<string, Test>
    clientSideRendered?: boolean
  }
}

interface Viewport {
  name?: string
  width: number
  height: number
}

interface Language {
  name: string
  code: string
}

interface MockedContext {
  key: any
  context: any
}
```

I already took this old version of a file:

```ts title="old.variants.ts"
import type { DeprecatedVariant, Viewport } from 'kitbook'
import type Component from './+page.svelte'

export const viewports: Viewport[] = [
  { width: 400, height: 300 },
]

export const variants: DeprecatedVariant<Component>[] = [
  {
    name: 'first situation',
    props: {
      foo: 'bar',
    },
  },
  {
    name: 'second instance',
    languages: [{ code: 'en', name: 'English' }],
    props: {
      foo: 'zam',
    },
  },
]
```

And turned it into this:

```ts title="new.variants.ts"
import type { Variant, VariantMeta } from 'kitbook'
import type Component from './+page.svelte'

export const shared_meta: VariantMeta = {
  viewports: [
    { width: 400, height: 300 }
  ]
}

const shared = {} satisfies Partial<Variant<Component>>

export const First_Situation: Variant<Component> = {
  ...shared,
  foo: 'bar',
}

export const Second_Instance: Variant<Component> = {
  ...shared,
  foo: 'zam',
  _meta: {
    languages: [{ code: 'en', name: 'English' }],
  },
}
```

Now please refactor this file according to what I've described above:

```ts title="todo.variants.ts"
// your code here
```
