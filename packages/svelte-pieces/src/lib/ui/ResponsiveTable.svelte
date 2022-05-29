<script lang="ts">
  export let sticky = false;
</script>

<div class:stickHeading={sticky} class="responsive-wrapper {$$props.class}">
  <table class="responsive-table">
    <slot />
  </table>
</div>

<style>
  .responsive-wrapper {
    @apply overflow-auto border rounded w-full h-full;
  }
  .responsive-table {
    width: 100%;
  }
  :global(.responsive-table th) {
    /* text-align: start to accomodate RTL languages */
    text-align: start;
    @apply px-3 py-3 border-b-2 border-gray-200 bg-gray-100
              text-xs font-semibold text-gray-600 uppercase tracking-wider;
  }
  :global(.responsive-table tr) {
    @apply hover:bg-gray-100 focus-within:bg-gray-200;
  }
  :global(.responsive-table td) {
    @apply px-3 py-2 border-b border-gray-200 text-sm;
  }

  /* Sticky header cells */
  :global(.responsive-table thead th) {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  :global(.responsive-table.stickHeading th:first-child) {
    @apply bg-white sticky left-0;
  }
</style>
