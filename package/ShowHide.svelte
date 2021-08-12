<script>let show = false;
function toggle() {
    show = !show;
}
// Usage example:
// <ShowHide let:show let:toggle>
// 	<Button onclick={toggle}>Show</Button>;
// 	{#if show}Toggled content{/if}
// </ShowHide>
</script>

<slot {show} {toggle} />
