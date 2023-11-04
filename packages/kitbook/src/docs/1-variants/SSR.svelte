<script>
  import { browser } from '$app/environment'

</script>

{#if browser}
  I show up on browser. Refresh me or hit the 'CSR' button to toggle me between SSR/CSR.
{:else}
  I show up on server.
{/if}
