<script lang="ts">
  import { Story } from 'kitbook';
  import HideOnScroll from '$lib/functions/HideOnScroll.svelte';
</script>

# HideOnScroll

<Story>
  <HideOnScroll duration={'300ms'} offset={50} tolerance={5}>
    <header
      class="py-4 md:py-6 w-full"
      style="background: linear-gradient(0deg, #f9f9fa00 0%, #f9f9fad9 40%, #f9f9fa 100%);"
    >
      Content inside vanishing header
    </header>
  </HideOnScroll>
  <main class="mt-50px">
    <div>This is mock content of a page with a lot of lines to make the page scrollable.</div>
    <div>Try scrolling up and down to see how the component works.</div>
    {#each [...Array(256)] as line}
      <div>A line...</div>
    {/each}
  </main>
</Story>
