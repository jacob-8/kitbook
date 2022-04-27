export function longpress(node: Node, duration = 400) {
  let start: number; // for shortpress
  let shortpressEmitted: number; // so touchend and mouseup events don't both emit on touch devices
  let timer; // for longpress
  let scrolled = 0;

  const handleDown = () => {
    start = Date.now();

    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, duration);
  };

  const handleUp = () => {
    const shortpressRecentlyEmitted = shortpressEmitted > Date.now() - duration / 2;
    const recentlyScrolled = Date.now() - scrolled < duration;
    const lessThanDurationHasElapsed = Date.now() - start < duration / 2;

    if (!shortpressRecentlyEmitted && !recentlyScrolled && lessThanDurationHasElapsed) {
      node.dispatchEvent(new CustomEvent('shortpress'));
      shortpressEmitted = Date.now();
    }

    clearTimeout(timer);
  };

  const handleMove = () => {
    scrolled = Date.now();
    clearTimeout(timer);
  };

  node.addEventListener('mousedown', handleDown);
  node.addEventListener('mouseup', handleUp);
  node.addEventListener('touchstart', handleDown);
  node.addEventListener('touchend', handleUp);
  node.addEventListener('touchmove', handleMove);

  return {
    update(newDuration: number) {
      duration = newDuration;
    },
    destroy() {
      node.removeEventListener('mousedown', handleDown);
      node.removeEventListener('mouseup', handleUp);
      node.removeEventListener('touchstart', handleDown);
      node.removeEventListener('touchend', handleUp);
      node.removeEventListener('touchmove', handleMove);
    },
  };
}
