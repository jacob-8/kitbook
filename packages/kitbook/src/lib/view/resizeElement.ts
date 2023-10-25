export function resizeElement(node: HTMLElement, container: HTMLDivElement) {
  let top: number
  let left: number

  node.addEventListener('mousedown', onmousedown, false)
  node.addEventListener('touchstart', ontouchstart, false)

  function onmousedown(event: MouseEvent) {
    event.preventDefault();
    ({ top, left } = container.getBoundingClientRect())

    window.addEventListener('mousemove', onmousemove, false)
    window.addEventListener('mouseup', onmouseup, false)

    function onmouseup() {
      window.removeEventListener('mousemove', onmousemove, false)
      window.removeEventListener('mouseup', onmouseup, false)
    };
  };

  function onmousemove(event: MouseEvent) {
    updateWidth(event.clientX - left)
    updateHeight(event.clientY - top)
  }

  function ontouchstart(event: TouchEvent) {
    if (event.targetTouches.length > 1)
      return
    event.preventDefault();
    ({ top, left } = container.getBoundingClientRect())

    window.addEventListener('touchmove', ontouchmove, false)
    window.addEventListener('touchend', ontouchend, false)

    function ontouchend() {
      window.removeEventListener('touchmove', ontouchmove, false)
      window.removeEventListener('touchend', ontouchend, false)
    };
  };

  function ontouchmove(event: TouchEvent) {
    updateWidth(event.touches[0].clientX - left)
    updateHeight(event.touches[0].clientY - top)
  }

  function updateWidth(width: number) {
    node.dispatchEvent(new CustomEvent<DragValues>('updatewidth', { detail: { pixels: width } }))
  }
  function updateHeight(height: number) {
    node.dispatchEvent(new CustomEvent<DragValues>('updateheight', { detail: { pixels: height } }))
  }

  return {
    destroy() {
      node.removeEventListener('mousedown', onmousedown, false)
      node.removeEventListener('touchstart', ontouchstart, false)
    },
  }
}
