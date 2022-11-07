<script lang="ts">
  import type { Page } from '../layout/pages';
  export let page: Page;
  export let activeURL: string;
  export let depth: number;
  export let root = '/';
  $: href = root === '/' ? page.url : root + page.url;
  $: active = activeURL === href;
</script>

<a
  class:font-semibold={active}
  class:text-blue-600={active}
  class="hover:text-blue-700 capitalize pr-3 text-sm flex"
  {href}
  style="padding-left: calc(0.75rem * {depth}"
>
  <span
    class="border-l border-gray-300 hover:border-blue-700 pr-3"
    class:border-dotted={!active}
    class:border-l-2={active}
    class:border-blue-700={active}
  />
  <span class="py-2">
    {page.name}
    <span class="opacity-30">
      {#if ['svelte', 'svx'].includes(page.ext)}
        <span class="i-simple-icons-svelte" />
      {:else if page.ext === 'md'}
        <span class="i-simple-icons-markdown" />
      {/if}
    </span>
  </span>
</a>
