<script lang="ts">
  import type { GroupedPage } from '$lib/kitbook-types';
  export let page: GroupedPage;
  export let activeURL: string;
  export let depth: number;
  $: active = activeURL === page.url;
</script>

<a
  class:font-semibold={active}
  class:text-blue-600={active}
  class:capitalize={!page.name.startsWith('+page') && !page.name.startsWith('+layout')}
  class="hover:text-blue-700 pr-3 text-xs flex"
  href={page.url}
  style="padding-left: calc(0.75rem * {depth}"
>
  <span
    class="border-l border-gray-300 hover:border-blue-700 pr-3"
    class:border-dotted={!active}
    class:border-l-2={active}
    class:border-blue-700={active}
  />
  <span class="py-0.5">
    {page.name}
    <span class="opacity-30">
      {#if page.extensions.includes('svelte') || page.extensions.includes('svx')}
        <span class="i-simple-icons-svelte" />
      {:else if page.extensions.includes('md')}
        <span class="i-simple-icons-markdown" />
      {/if}
    </span>
  </span>
</a>
