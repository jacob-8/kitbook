<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { portal } from 'svelte-pieces';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import SearchResult from './SearchResult.svelte';
  import { filterPages } from './filterPages';

  const dispatch = createEventDispatcher<{ close: boolean }>();
  function close() {
    dispatch('close');
  }

  function autofocus(node: HTMLInputElement) {
    setTimeout(() => node.focus(), 15);
  }

  let modal: HTMLElement;
  let query = '';

  $: filteredPages = filterPages($page.data?.pages, query);
  $: activeIndex = filteredPages?.length ? 0 : null;

  function selectPrevious() {
    if (activeIndex > 0) activeIndex -= 1;
  }
  function selectNext() {
    if (activeIndex < filteredPages.length - 1) activeIndex += 1;
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') return close();

    if (['ArrowDown', 'ArrowUp', 'Tab'].includes(e.key)) e.preventDefault();

    if (e.key === 'ArrowDown') selectNext();
    if (e.key === 'Tab' && !e.shiftKey) selectNext();

    if (e.key === 'ArrowUp') selectPrevious();
    if (e.key === 'Tab' && e.shiftKey) selectPrevious();
  }}
/>

<div
  use:portal
  class="fixed inset-0 p-4 md-pt-10 flex items-start justify-center"
  style="z-index: 60;"
>
  <div class="fixed inset-0 transition-opacity" transition:fade={{ duration: 200 }}>
    <button type="button" class="absolute inset-0 bg-black opacity-50" on:click={close} />
  </div>

  <div
    transition:fade={{ duration: 200 }}
    class="bg-white rounded-lg overflow-hidden shadow-xl transform
    transition-all sm:max-w-lg w-full max-h-full flex flex-col z-1 relative"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
    bind:this={modal}
  >
    <input
      class="p-3 outline-none"
      use:autofocus
      on:keydown={(e) => {
        if (e.key === 'Enter' && activeIndex !== null) {
          goto(filteredPages[activeIndex].url);
        }
      }}
      bind:value={query}
      placeholder="Search"
      aria-label="Search"
      spellcheck="false"
    />
    <button
      type="button"
      class="absolute top-1 right-1 p-3 hover-bg-gray-200 rounded opacity-25 hover:opacity-100 flex items-center"
      on:click={close}><span class="i-fa-solid-times" /></button
    >
    <div class="overflow-y-auto flex-1 border-t border-gray-300">
      {#each filteredPages as page, index}
        <SearchResult active={index === activeIndex} {page} />
      {:else}
        <div class="opacity-50 p-3">No results found</div>
      {/each}
    </div>
  </div>
</div>
