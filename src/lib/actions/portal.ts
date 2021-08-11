/**
 * Usage: `<div use:portal>` or `<div use:portal={'#direction'}>`, add `hidden` if SSR rendered (requires updating action with node.hidden = false and true)
 */
export function portal(node: HTMLElement, target = 'body') {
  const portal = document.createElement('div');
  document.querySelector(target).appendChild(portal);
  portal.appendChild(node);

  return {
    destroy() {
      portal.parentElement.removeChild(portal);
    },
  };
}
// from https://github.com/romkor/svelte-portal
