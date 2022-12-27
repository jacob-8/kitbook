export function dragElement(node: HTMLElement) {
  const onmousemove = (event: MouseEvent) => {
    console.log(event)
    node.dispatchEvent(new CustomEvent<number>("movementx", { detail: event.movementX }));
    node.dispatchEvent(new CustomEvent<number>("movementy", { detail: event.movementY }));
  }

  const onmousedown = (event: MouseEvent) => {
    event.preventDefault();

    const onmouseup = () => {
      window.removeEventListener('mousemove', onmousemove, false);
      window.removeEventListener('mouseup', onmouseup, false);
    };

    window.addEventListener('mousemove', onmousemove, false);
    window.addEventListener('mouseup', onmouseup, false);
  };

  const ontouchmove = (event: TouchEvent) => {
    node.dispatchEvent(new CustomEvent<number>("touchx", { detail: event.touches[0].clientX }));
    node.dispatchEvent(new CustomEvent<number>("touchy", { detail: event.touches[0].clientY }));
  }
  const ontouchstart = (event: TouchEvent) => {
    if (event.targetTouches.length > 1) return;
    event.preventDefault();
    const ontouchend = () => {
      window.removeEventListener('touchmove', ontouchmove, false);
      window.removeEventListener('touchend', ontouchend, false);
    };
    window.addEventListener('touchmove', ontouchmove, false);
    window.addEventListener('touchend', ontouchend, false);
  };

  node.addEventListener('mousedown', onmousedown, false);
  node.addEventListener('touchstart', ontouchstart, false);
  return {
    destroy() {
      node.removeEventListener('mousedown', onmousedown, false);
      node.removeEventListener('touchstart', ontouchstart, false);
    },
  };
}