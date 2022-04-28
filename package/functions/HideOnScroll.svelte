<script >// From https://github.com/collardeau/svelte-headroom
export let duration = '300ms';
export let offset = 0;
export let tolerance = 0;
export let zIndex = 1;
export let direction = 'down';
export let bottom = false;
let headerClass = 'pin';
let y = 0;
let lastY = 0;
function deriveClass(y = 0, scrolled = 0) {
    if (y < offset)
        return 'pin';
    if (!scrolled || Math.abs(scrolled) < tolerance)
        return headerClass;
    const dir = scrolled < 0 ? 'down' : 'up';
    if (dir !== direction)
        return 'pin';
    if (dir === direction)
        return 'unpin';
    return headerClass;
}
function updateClass(y = 0) {
    const scrolledPxs = lastY - y;
    const result = deriveClass(y, scrolledPxs);
    lastY = y;
    return result;
}
function action(node) {
    node.style.transitionDuration = duration;
}
$: headerClass = updateClass(y);
</script>

<svelte:window bind:scrollY={y} />

<div use:action class={headerClass} class:bottom style="z-index: {zIndex};">
  <slot />
</div>

<style windi:inject>
div {
  position: fixed;
  width: 100%;
  top: 0;
  transition: transform 300ms linear;
}
.pin {
  transform: translateY(0%);
}
.unpin {
  transform: translateY(-100%);
}
div.bottom {
  top: unset;
  bottom: 0;
}
.pin.bottom {
  transform: translateY(0%);
}
.unpin.bottom {
  transform: translateY(100%);
}

</style>
