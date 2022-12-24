<script lang="ts">
  import IntersectionObserver from '$lib/functions/IntersectionObserver.svelte';
  import IntersectionObserverShared from '$lib/functions/IntersectionObserverShared.svelte';
  import { Story } from 'kitbook';
</script>

# Intersection Observer

<Story name="single Use">
  <IntersectionObserver let:intersecting>
    {intersecting}
  </IntersectionObserver>
</Story>

IntersectionObserverShared (below) is used when you want to watch many items. Sometimes, though you don't want the IntersectionObserverShared component to add it's own block div element to
the DOM (like when it breaks up a flex flow for example). In this case place your content inside the `noElement` slot using `svelte:fragment` as seen in the 2nd block below.

<Story name="shared use">
  <IntersectionObserverShared let:intersecting>
    <div class:intersecting style="height: 500px;">
      {intersecting}
    </div>
  </IntersectionObserverShared>
  <IntersectionObserverShared let:intersecting width="0px">
    <svelte:fragment slot="noElement">
      <div class:intersecting style="height: 500px;">
        {intersecting}
      </div>
    </svelte:fragment>
  </IntersectionObserverShared>
  <IntersectionObserverShared let:intersecting>
    <div class:intersecting style="height: 500px;">
      {intersecting}
    </div>
  </IntersectionObserverShared>
</Story>

<style>
  .intersecting {
    --at-apply: bg-red-100 border border-red-400;
  }
</style>
