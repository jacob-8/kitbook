<script lang="ts">
  import type { Page } from './pages';
  export let page: Page;
  export let activeURL: string;
  export let depth: number;
</script>

<a
	class:bg-gray-200={activeURL === page.url}
  class="hover:bg-gray-300 capitalize pr-3 py-2 text-sm"
  href={page.url}
  style="padding-left: calc(0.75rem * {depth + 1}">
    {page.name}
    <span class="opacity-30">
      {#if ['svelte', 'svx'].includes(page.ext)}
        <span class="i-simple-icons-svelte" />
      {:else if page.ext === 'md'}
        <span class="i-simple-icons-markdown" />
      {/if}
    </span>
</a>
