export function drag(node) {
    let documentWidth;
    let documentHeight;
    node.addEventListener('mousedown', onmousedown, false);
    node.addEventListener('touchstart', ontouchstart, false);
    function onmousedown(event) {
        startDragging(event);
        window.addEventListener('mousemove', onmousemove, false);
        window.addEventListener('mouseup', onmouseup, false);
        function onmouseup() {
            node.dispatchEvent(new CustomEvent("stopdragging"));
            window.removeEventListener('mousemove', onmousemove, false);
            window.removeEventListener('mouseup', onmouseup, false);
        }
        ;
    }
    ;
    function ontouchstart(event) {
        if (event.targetTouches.length > 1)
            return;
        startDragging(event);
        window.addEventListener('touchmove', ontouchmove, false);
        window.addEventListener('touchend', ontouchend, false);
        function ontouchend() {
            node.dispatchEvent(new CustomEvent("stopdragging"));
            window.removeEventListener('touchmove', ontouchmove, false);
            window.removeEventListener('touchend', ontouchend, false);
        }
        ;
    }
    ;
    function startDragging(event) {
        event.preventDefault();
        documentWidth = document.body.clientWidth;
        documentHeight = window.innerHeight;
        node.dispatchEvent(new CustomEvent("startdragging"));
    }
    function onmousemove(event) {
        const widthPercent = (event.clientX / documentWidth) * 100;
        updateWidth(widthPercent);
        const heightPercent = (event.clientY / documentHeight) * 100;
        updateHeight(heightPercent);
    }
    function ontouchmove(event) {
        const widthPercent = (event.touches[0].clientX / documentWidth) * 100;
        updateWidth(widthPercent);
        const heightPercent = (event.touches[0].clientY / documentHeight) * 100;
        updateHeight(heightPercent);
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
