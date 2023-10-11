/// <reference types="svelte" />
/// <reference types="vite/client" />
import type { SvelteComponentTyped } from 'svelte'

interface SvelteDevInternal {
  version: string
}

interface MySvelteComponentTyped<Props, Events, Slots> extends SvelteComponentTyped<Props, Events, Slots> {
  $$: {
    fragment: {
      m(target: Node, anchor: Node): void // mount
      p(changed: boolean, ctx: any): void // update
      d(detaching: boolean): void // destroy
      // we only use the functions above but the ones below also exist in certain contexts
      // c(): void // create
      // h(): any // hydrate
      // i(): void // intro(local)
      // o(): void // outro(local) // found in the blocks
      // l(nodes: any[]): void // claim(nodes)
    }
  }
}

declare global {
  interface ComponentWithChildren {
    componentDetail: SvelteComponentDetail
    parentComponent?: ComponentFragment
    childComponents: Set<ComponentFragment>
    childElements: Set<SvelteElementDetail>
  }

  type ComponentFragment = SvelteComponentDetail['component']['$$']['fragment']

  interface SvelteComponentDetail {
    id: 'create_fragment'
    options: {
      $$inline?: boolean
      props?: Record<string, any>
      hydrate?: boolean
      target?: Element
    }
    tagName: string
    component: MySvelteComponentTyped<Props, Events, Slots>
  }

  interface SvelteBlockDetail {
    version: string
    id: string
    source: string
    block: ComponentFragment
    ctx: Array<any>
    type:
    | 'anchor'
    | 'block'
    | 'component' // components are registered as components and as blocks
    | 'each'
    | 'element'
    | 'else'
    | 'if'
    | 'key'
    | 'slot'
    | 'text'
    | 'pending' // await
    | 'then'
    | 'catch'
  }

  type SvelteElementDetail = Node & {
    claim_order: number
    __svelte_meta?: SvelteMeta // nodes of element type will have, nodes of text type won't
    hydrate_init: boolean
    actual_end_child?: any
  }

  type SvelteHTMLElement = HTMLElement & {
    __svelte_meta?: SvelteMeta
  }

  interface SvelteMeta {
    loc: {
      file: string
      line: number
      column: number
      char: number
    }
  }

  interface DocumentEventMap {
    SvelteRegisterComponent: CustomEvent<SvelteDevInternal & SvelteComponentDetail>
    SvelteRegisterBlock: CustomEvent<SvelteDevInternal & SvelteBlockDetail>
    SvelteDOMInsert: CustomEvent<SvelteDevInternal & {
      node: SvelteElementDetail
      target: SvelteElementDetail
      anchor?: SvelteElementDetail // usually null
    }>
    SvelteDOMRemove: CustomEvent<SvelteDevInternal & {
      node: SvelteElementDetail
    }>
  }
}
