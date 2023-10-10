/// <reference types="svelte" />
/// <reference types="vite/client" />
import type { SvelteComponentTyped } from 'svelte'

interface SvelteDevInternal {
  version: string
}

interface MySvelteComponentTyped<Props, Events, Slots> extends SvelteComponentTyped<Props, Events, Slots> {
  $$: {
    fragment: {
      c(): void // create
      d(detaching: boolean): void // destroy
      // h(): any // hydrate
      i(): void // intro(local)
      // o(): void // outro(local) // found in the blocks
      l(nodes: any[]): void // claim(nodes)
      m(target: Node, anchor: Node): void // mount
      p(changed: boolean, ctx: any): void // update
    }
  }
}

declare global {
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
    id: number // is 'create_fragment' for a component
    source: string
    type:
    | 'anchor'
    | 'block'
    | 'catch'
    | 'component' // components are registered as components and as blocks
    | 'each'
    | 'element'
    | 'else'
    | 'if'
    | 'iteration'
    | 'key'
    | 'pending'
    | 'slot'
    | 'text'
    | 'then'

    detail?: any
    tagName?: string

    parent?: SvelteBlockDetail
    parentBlock?: SvelteBlockDetail
    children: SvelteBlockDetail[]

    block: SvelteComponentDetail['component']['$$']['fragment']
    ctx: Array<any> // TODO: do we need this typed?
  }

  type SvelteElementDetail = Node & {
    claim_order: number
    __svelte_meta?: SvelteMeta // target always has, node will have unless it is a text node
    hydrate_init: boolean
    actual_end_child?: any
  }

  type SvelteHTMLElement = HTMLElement & {
    __svelte_meta?: SvelteMeta
  }

  type SvelteMeta = {
    loc: {
      file: string
      line: number
      column: number
      char: number
    }
  }

  interface SvelteListenerDetail {
    node: Node & {
      __listeners?: Omit<SvelteListenerDetail, 'node'>[]
    }
    event: string
    handler: EventListenerOrEventListenerObject
    modifiers: Array<'capture' | 'preventDefault' | 'stopPropagation' | 'stopImmediatePropagation'>
  }

  interface DocumentEventMap {
    SvelteRegisterComponent: CustomEvent<SvelteDevInternal & SvelteComponentDetail>

    SvelteRegisterBlock: CustomEvent<SvelteDevInternal & SvelteBlockDetail>

    SvelteDOMInsert: CustomEvent<SvelteDevInternal & {
      node: SvelteElementDetail
      target: SvelteElementDetail
      anchor?: SvelteElementDetail // usually null
    }>
    SvelteDOMRemove: CustomEvent<SvelteDevInternal & { node: Node }>

    SvelteDOMAddEventListener: CustomEvent<SvelteDevInternal & SvelteListenerDetail>
    SvelteDOMRemoveEventListener: CustomEvent<SvelteDevInternal & SvelteListenerDetail>

    SvelteDOMSetAttribute: CustomEvent<
      SvelteDevInternal & {
        node: Element
        attribute: string
        value?: string
      }
    >
    SvelteDOMRemoveAttribute: CustomEvent<
      SvelteDevInternal & {
        node: Element
        attribute: string
      }
    >
    SvelteDOMSetProperty: CustomEvent<
      SvelteDevInternal & {
        node: Element
        property: string
        value?: any
      }
    >
    SvelteDOMSetDataset: CustomEvent<
      SvelteDevInternal & {
        node: HTMLElement
        property: string
        value?: any
      }
    >
    SvelteDOMSetData: CustomEvent<
      SvelteDevInternal & {
        node: Text
        data: unknown
      }
    >
  }
}

export { }
