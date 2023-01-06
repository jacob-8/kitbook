export function resizeElement(node, container) {
    let top;
    let left;
    node.addEventListener('mousedown', onmousedown, false);
    node.addEventListener('touchstart', ontouchstart, false);
    function onmousedown(event) {
        event.preventDefault();
        ({ top, left } = container.getBoundingClientRect());
        window.addEventListener('mousemove', onmousemove, false);
        window.addEventListener('mouseup', onmouseup, false);
        function onmouseup() {
            window.removeEventListener('mousemove', onmousemove, false);
            window.removeEventListener('mouseup', onmouseup, false);
        }
        ;
    }
    ;
    function onmousemove(event) {
        updateWidth(event.clientX - left);
        updateHeight(event.clientY - top);
    }
    function ontouchstart(event) {
        if (event.targetTouches.length > 1)
            return;
        event.preventDefault();
        ({ top, left } = container.getBoundingClientRect());
        window.addEventListener('touchmove', ontouchmove, false);
        window.addEventListener('touchend', ontouchend, false);
        function ontouchend() {
            window.removeEventListener('touchmove', ontouchmove, false);
            window.removeEventListener('touchend', ontouchend, false);
        }
        ;
    }
    ;
    function ontouchmove(event) {
        updateWidth(event.touches[0].clientX - left);
        updateHeight(event.touches[0].clientY - top);
    }
    function updateWidth(width) {
        node.dispatchEvent(new CustomEvent("updatewidth", { detail: width }));
    }
    function updateHeight(height) {
        node.dispatchEvent(new CustomEvent("updateheight", { detail: height }));
    }
    return {
        destroy() {
            node.removeEventListener('mousedown', onmousedown, false);
            node.removeEventListener('touchstart', ontouchstart, false);
        },
    };
}
