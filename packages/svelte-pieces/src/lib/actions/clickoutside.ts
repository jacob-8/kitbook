/**
 * Add to app.d.ts file:
 * ```
 * declare namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:clickoutside'?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
    }
  }
  ```
 */
export function clickoutside(node: Node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickoutside'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
