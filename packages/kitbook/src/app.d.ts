// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

// Syntax: https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:updatewidth'?: (event: { detail: DragValues }) => any
    'on:updateheight'?: (event: { detail: DragValues }) => any
    'on:stopdragging'?: (event: boolean) => any
    'on:startdragging'?: (event: boolean) => any
  }
}

interface DragValues {
  pixels: number
  percentage?: number
}
