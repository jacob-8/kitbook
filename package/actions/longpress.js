export function longpress(node, duration = 500) {
    let timer;
    const handleDown = () => {
        timer = setTimeout(() => {
            node.dispatchEvent(new CustomEvent('longpress'));
        }, duration);
    };
    const handleUp = () => {
        clearTimeout(timer);
    };
    node.addEventListener('mousedown', handleDown);
    node.addEventListener('mouseup', handleUp);
    node.addEventListener('touchstart', handleDown);
    node.addEventListener('touchend', handleUp);
    return {
        update(newDuration) {
            duration = newDuration;
        },
        destroy() {
            node.removeEventListener('mousedown', handleDown);
            node.removeEventListener('mouseup', handleUp);
            node.addEventListener('touchstart', handleDown);
            node.addEventListener('touchend', handleUp);
        }
    };
}
