<script lang="ts">
  import type { ParsedModuleSet } from 'kitbook/kitbook-types';
  import Iframe from './Iframe.svelte';
    import { page } from '$app/state';

  interface Props {
    module_set: ParsedModuleSet;
  }

  let { module_set }: Props = $props();
  let { component } = $derived(module_set);
</script>

<div class="mt-3 mx-3">
  <a class="bg-gray-100 cursor-pointer inline-block border border-black/50 rounded overflow-hidden" href="./{module_set.url}">
    <div class="p-1 text-lg font-semibold bg-gray-200 text-gray-800 border-b border-black/50">
      {module_set.url.replace(page.data.settings.routes_directory.replace('src/', ''), '').replace('/+page', '')}
    </div>
    <div class="w-500px h-300px bg-white pointer-events-none">
      <div class="w-1000px h-600px" style="transform: scale(0.5); transform-origin: 0 0;">
        <Iframe src="/sandbox/{module_set.url}" />
      </div>
    </div>
  </a>
</div>
