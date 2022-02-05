declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickoutside?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
  }
}