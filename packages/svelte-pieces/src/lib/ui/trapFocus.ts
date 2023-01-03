export function trapFocus(e: KeyboardEvent, container: HTMLElement) {
  const nodes = container.querySelectorAll('*') as NodeListOf<HTMLElement>;
  const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

  let index = tabbable.indexOf(document.activeElement as HTMLElement);
  if (index === -1 && e.shiftKey) index = 0;

  index += tabbable.length + (e.shiftKey ? -1 : 1);
  index %= tabbable.length;

  tabbable[index].focus();
  e.preventDefault();
}