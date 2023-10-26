export function drag(node: HTMLElement) {
  let documentWidth: number
  let documentHeight: number

  node.addEventListener('mousedown', onmousedown, false)
  node.addEventListener('touchstart', ontouchstart, false)

  function onmousedown(event: MouseEvent) {
    startDragging(event)
    window.addEventListener('mousemove', onmousemove, false)
    window.addEventListener('mouseup', onmouseup, false)

    function onmouseup() {
      node.dispatchEvent(new CustomEvent<boolean>('stopdragging'))
      window.removeEventListener('mousemove', onmousemove, false)
      window.removeEventListener('mouseup', onmouseup, false)
    };
  };

  function ontouchstart(event: TouchEvent) {
    if (event.targetTouches.length > 1)
      return
    startDragging(event)

    window.addEventListener('touchmove', ontouchmove, false)
    window.addEventListener('touchend', ontouchend, false)

    function ontouchend() {
      node.dispatchEvent(new CustomEvent<boolean>('stopdragging'))
      window.removeEventListener('touchmove', ontouchmove, false)
      window.removeEventListener('touchend', ontouchend, false)
    };
  };

  function startDragging(event: MouseEvent | TouchEvent) {
    event.preventDefault()
    documentWidth = document.body.clientWidth
    documentHeight = window.innerHeight
    node.dispatchEvent(new CustomEvent<boolean>('startdragging'))
  }

  function onmousemove(event: MouseEvent) {
    updateWidth(event.clientX)
    updateHeight(event.clientY)
  }

  function ontouchmove(event: TouchEvent) {
    updateWidth(event.touches[0].clientX)
    updateHeight(event.touches[0].clientY)
  }

  function updateWidth(widthPixels: number) {
    const widthPercent = (widthPixels / documentWidth) * 100
    node.dispatchEvent(new CustomEvent<DragValues>('updatewidth', { detail: { pixels: widthPixels, percentage: widthPercent } }))
  }

  function updateHeight(heightPixels: number) {
    const heightPercent = (heightPixels / documentHeight) * 100
    node.dispatchEvent(new CustomEvent<DragValues>('updateheight', { detail: { pixels: heightPixels, percentage: heightPercent } }))
  }

  return {
    destroy() {
      node.removeEventListener('mousedown', onmousedown, false)
      node.removeEventListener('touchstart', ontouchstart, false)
    },
  }
}
