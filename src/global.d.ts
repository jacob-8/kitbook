/// <reference types="@sveltejs/kit" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onlongpress?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
  }
}