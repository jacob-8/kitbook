export function drag(node: HTMLElement) {
  let documentWidth: number;
  let documentHeight: number;

  node.addEventListener('mousedown', onmousedown, false);
  node.addEventListener('touchstart', ontouchstart, false);

  function onmousedown(event: MouseEvent) {
    startDragging(event);
    window.addEventListener('mousemove', onmousemove, false);
    window.addEventListener('mouseup', onmouseup, false);
    
    function onmouseup() {
      node.dispatchEvent(new CustomEvent<boolean>("stopdragging"));
      window.removeEventListener('mousemove', onmousemove, false);
      window.removeEventListener('mouseup', onmouseup, false);
    };
  };
    
  function ontouchstart(event: TouchEvent) {
    if (event.targetTouches.length > 1) return;
    startDragging(event);
    
    window.addEventListener('touchmove', ontouchmove, false);
    window.addEventListener('touchend', ontouchend, false);
    
    function ontouchend() {
      node.dispatchEvent(new CustomEvent<boolean>("stopdragging"));
      window.removeEventListener('touchmove', ontouchmove, false);
      window.removeEventListener('touchend', ontouchend, false);
    };
  };

  function startDragging(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    documentWidth = document.body.clientWidth;
    documentHeight = window.innerHeight;
    node.dispatchEvent(new CustomEvent<boolean>("startdragging"));
  }

  
  function onmousemove(event: MouseEvent) {
    const widthPercent = (event.clientX / documentWidth) * 100;
    updateWidth(widthPercent)
    const heightPercent = (event.clientY / documentHeight) * 100;
    updateHeight(heightPercent)
  }
  
  function ontouchmove(event: TouchEvent) {
    const widthPercent = (event.touches[0].clientX / documentWidth) * 100;
    updateWidth(widthPercent)
    const heightPercent = (event.touches[0].clientY / documentHeight) * 100;
    updateHeight(heightPercent)
  }

  function updateWidth(width: number) {
    node.dispatchEvent(new CustomEvent<number>("updatewidth", { detail: width }));
  }

  function updateHeight(height: number) {
    node.dispatchEvent(new CustomEvent<number>("updateheight", { detail: height }));
  }

  return {
    destroy() {
      node.removeEventListener('mousedown', onmousedown, false);
      node.removeEventListener('touchstart', ontouchstart, false);
    },
  };
}