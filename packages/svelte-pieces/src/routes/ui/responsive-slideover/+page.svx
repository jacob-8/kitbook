<script lang="ts">
  import ShowHide from '$lib/functions/ShowHide.svelte';
  import Button from '$lib/ui/Button.svelte';
  import ResponsiveSlideover from '$lib/ui/ResponsiveSlideover.svelte';
  import { Story } from 'kitbook';
  const sizes: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
</script>

# Responsive Slideover

{#each sizes as size}
  <Story name={size}>
    <ShowHide let:show let:toggle>
      <div
        class:sm:hidden={size === 'sm'}
        class:md:hidden={size === 'md'}
        class:lg:hidden={size === 'lg'}
        class:xl:hidden={size === 'xl'}
      >
        <Button onclick={toggle}>Show Slideover</Button>
      </div>
      <ResponsiveSlideover showWidth={size} open={show}>
        <div slot="title">Universal Title</div>
        <div class="p-3 border-b font-semibold" slot="heading">Universal Heading</div>
        <div class="p-3 border-b font-semibold" slot="desktopHeading">Desktop Heading</div>
        <div class="p-3 border-b font-semibold" slot="mobileHeading">Mobile Heading</div>
        <div class="p-3 hover:bg-gray-100">Menu Item</div>
        <div class="p-3 hover:bg-gray-100">Menu Item</div>
        <div class="p-3 hover:bg-gray-100">Menu Item</div>
        <div class="p-3 hover:bg-gray-100">Menu Item</div>
      </ResponsiveSlideover>
    </ShowHide>
  </Story>
{/each}
