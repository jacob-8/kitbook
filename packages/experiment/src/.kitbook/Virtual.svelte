<script lang="ts">
  let name = 'bobs';
</script>

<div on:click={() => (name = 'jim')}>Hello, {name}!</div>
