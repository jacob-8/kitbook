<script>
  import { onMount } from 'svelte';
  let show = false;

  onMount(() => {
    setTimeout(() => (show = true), 500);
  });
</script>

{#if show}
  <div style="height: 200px; background: green;" />
{/if}

This demonstrates how Children components are remounted when parents are HMRed.