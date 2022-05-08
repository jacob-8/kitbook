<script lang="ts">
  let show = false;
  function toggle() {
    show = !show;
  }
  function set(value: boolean) {
    show = value;
  }
</script>

<slot {show} {toggle} {set} />
