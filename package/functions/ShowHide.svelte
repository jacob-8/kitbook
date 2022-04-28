<script >let show = false;
function toggle() {
    show = !show;
}
function set(value) {
    show = value;
}
</script>

<slot {show} {toggle} {set} />

<style windi:inject>
</style>