<script lang="ts">
  import { Story } from 'kitbook';
  import HideOnScroll from '$lib/functions/HideOnScroll.svelte';
  import ShowHide from '$lib/functions/ShowHide.svelte';
  import Button from '$lib/ui/Button.svelte';
</script>

# HideOnScroll

<Story>
  <ShowHide let:toggle let:show>
    {#if show}
      <HideOnScroll duration={'300ms'} offset={50} tolerance={5}>
        <header
          class="py-4 md:py-6 w-full"
          style="background: linear-gradient(0deg, #f9f9fa00 0%, #f9f9fad9 40%, #f9f9fa 100%);"
        >
          Content inside vanishing header
        </header>
      </HideOnScroll>
    {:else}
      Needs iframe functionality before can be demoed
    {/if}
    <main>
      <div>This is mock content of the page.</div>
      <div>Just a lot of lines to make the page scrollable.</div>
      <div>One more</div>
      <Button onclick={toggle}>Turn {show ? 'off' : 'on'}</Button>
      {#each [...Array(256)] as line}
        <div>A line...</div>
      {/each}
    </main>
  </ShowHide>
</Story>
