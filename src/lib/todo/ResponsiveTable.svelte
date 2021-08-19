<div class="responsive-wrapper {$$props.class}">
  <table class="responsive-table">
    <slot />
  </table>
</div>

<style>
  .responsive-wrapper {
    @apply overflow-x-auto border rounded w-full;
  }
  .responsive-table {
    width: 100%;
  }
  :global(.responsive-table th) {
    text-align: start;
    /* To accomodate RTL languages */
    @apply px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left
              text-xs font-semibold text-gray-600 uppercase tracking-wider;
  }
  :global(.responsive-table tr) {
    @apply hover:bg-gray-100 focus-within:bg-gray-200;
  }
  :global(.responsive-table td) {
    @apply px-3 py-2 border-b border-gray-200 text-sm;
  }
</style>
