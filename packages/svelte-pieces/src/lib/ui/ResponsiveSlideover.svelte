<script lang="ts">
  import Slideover from './Slideover.svelte';

  // Slideover props
  export let zIndex = 60;
  export let duration = 200;
  export let side: 'left' | 'right' = 'right';
  export let widthRem = 16;
  export let maxWidthPercentage = 70;

  export let showWidth: 'sm' | 'md' | 'lg' | 'xl';
  export let desktopClasses = '';
  export let mobileClasses = '';

  export let open = false;
</script>

<div
  class:sm:block={showWidth === 'sm'}
  class:md:block={showWidth === 'md'}
  class:lg:block={showWidth === 'lg'}
  class:xl:block={showWidth === 'xl'}
  class="hidden {desktopClasses}"
>
  {#if $$slots.title}
    <h3 class="text-lg font-medium text-gray-900 p-3 border-b border-gray-300">
      <slot name="title" />
    </h3>
  {/if}
  <slot name="desktop-heading" />
  <slot name="heading" />
  <slot />
  <!-- <slot name="desktop" /> -->
</div>

{#if open}
  <div
    class:<sm:block={showWidth === 'sm'}
    class:<md:block={showWidth === 'md'}
    class:<lg:block={showWidth === 'lg'}
    class:<xl:block={showWidth === 'xl'}
    class="hidden {mobileClasses}"
  >
    <Slideover
      {duration}
      {zIndex}
      {side}
      {widthRem}
      {maxWidthPercentage}
      on:close={() => (open = false)}
    >
      <svelte:fragment slot="heading">
        {#if $$slots.title}
          <div class="flex items-start justify-between border-b border-gray-300">
            <h3 class="text-lg font-medium text-gray-900 p-3" id="modal-headline">
              <slot name="title" />
            </h3>
            <button
              on:click={() => (open = false)}
              type="button"
              class="text-gray-400 px-3 py-4 flex hover:text-gray-500 focus:outline-none
    focus:text-gray-500 transition ease-in-out duration-150"
              aria-label="Close"
            >
              <span class="i-fa-solid-times text-lg" /></button
            >
          </div>
        {/if}
        <slot name="mobile-heading" />
        <slot name="heading" />
      </svelte:fragment>
      <slot />
      <!-- <slot name="mobile" /> -->
    </Slideover>
  </div>
{/if}
