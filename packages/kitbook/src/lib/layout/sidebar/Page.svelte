<script lang="ts">
  import type { GroupedPage } from '../../kitbook-types';
  export let page: GroupedPage;
  export let activeURL: string;
  export let depth: number;
  $: active = activeURL === page.url;
  $: doesNotHaveSvxOrVariants = !(page.loadSvx || page.loadVariants);
</script>

<a
  class:opacity-60={doesNotHaveSvxOrVariants}
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
  <span class="py-0.5" style="overflow-wrap: anywhere;">
    {page.name}
  </span>
</a>
