<script lang="ts">
  import IntersectionObserver from './IntersectionObserver.svelte';
  import IntersectionObserverShared from './IntersectionObserverShared.svelte';
  import { Story } from 'kitbook';
</script>

# Intersection Observer

Observes the first child element placed inside.

<Story name="single Use">
  <IntersectionObserver let:intersecting>
    <div>
      {intersecting}
    </div>
  </IntersectionObserver>
</Story>

Can be used to watch many items, efficiently. Note that the first element to init's `top`, `right`, `bottom`, `left` and `threshold` values will be used. We use -150 on the bottom here so you can see the observer working without needing dev tools.

<Story name="shared use">
  {#each Array(3) as _}
    <IntersectionObserverShared let:intersecting bottom={-150}>
      <div class:intersecting style="height: 500px;">
        {intersecting}
      </div>
    </IntersectionObserverShared>
  {/each}
</Story>

<style>
  .intersecting {
    --at-apply: bg-red-100 border border-red-400;
  }
</style>
