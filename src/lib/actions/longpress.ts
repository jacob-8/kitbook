export function longpress(node: Node, duration = 500) {
  let start: number; // for shortpress
  let shortpressed: number; // so touchend and mouseup events don't both emit on touch devices
  let timer; // for longpress

  const handleDown = () => {
    start = Date.now();

    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, duration);
  };

  const handleUp = () => {
    if (!(shortpressed > Date.now() - duration / 2) && Date.now() - start < duration) {
      node.dispatchEvent(new CustomEvent('shortpress'));
      shortpressed = Date.now(); 
    }

    clearTimeout(timer);
  };

  node.addEventListener('mousedown', handleDown);
  node.addEventListener('mouseup', handleUp);
  node.addEventListener('touchstart', handleDown);
  node.addEventListener('touchend', handleUp);

  return {
    update(newDuration: number) {
      duration = newDuration;
    },
    destroy() {
      node.removeEventListener('mousedown', handleDown);
      node.removeEventListener('mouseup', handleUp);
      node.addEventListener('touchstart', handleDown);
      node.addEventListener('touchend', handleUp);
    },
  };
}
