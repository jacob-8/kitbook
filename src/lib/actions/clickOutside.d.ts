declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickedOutside?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
  }
}