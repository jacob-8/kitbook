declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickOutside?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
  }
}