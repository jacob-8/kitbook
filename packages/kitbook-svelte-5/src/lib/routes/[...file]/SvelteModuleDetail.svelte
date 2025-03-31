<script lang="ts">
  import type { ParsedModuleSet } from 'kitbook/kitbook-types';
  import Iframe from './Iframe.svelte';
  import { build_iframe_url } from './build_iframe_url';
  import { page } from '$app/state';

  interface Props {
    parsed_module: ParsedModuleSet;
  }

  let { parsed_module }: Props = $props();
  let { component } = $derived(parsed_module);
</script>

{#if parsed_module.component?.parent_paths.length}
  <div class="flex">
    {#each parsed_module.component.parent_paths as parent_paths}
      {@const module_set = page.data.parsed_module_sets[parent_paths]}
      <div class="mt-3 ml-3">
        <a class="bg-gray-100 cursor-pointer inline-block border border-black/50 rounded overflow-hidden" href="/{module_set.url}">
          <div class="p-1 bg-gray-200 text-gray-800 border-b border-black/50">
            {module_set.url.replace(parsed_module.url.substring(0, parsed_module.url.lastIndexOf('/')), '.')}
          </div>
          <div class="w-250px h-150px bg-white pointer-events-none">
            <div class="w-500px h-300px" style="transform: scale(0.5); transform-origin: 0 0;">
              <Iframe src="/sandbox/{module_set.url}" />
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
{/if}

<div class="border w-1000px h-600px bg-white ml-3">
  <Iframe
    src={build_iframe_url({
      pathname: page.url.pathname,
      props: null,
      story_name: null,
      composition_name: null,
      dark_mode: false,
    })}
  />
</div>

{#if parsed_module.component?.children_paths}
  <div class="flex">
    {#each parsed_module.component.children_paths as child_path}
      {@const module_set = page.data.parsed_module_sets[child_path]}
      <div class="mt-3 ml-3">
        <a class="bg-gray-100 cursor-pointer inline-block border border-black/50 rounded overflow-hidden" href="/{module_set.url}">
          <div class="p-1 bg-gray-200 text-gray-800 border-b border-black/50">
            {module_set.url.replace(parsed_module.url.substring(0, parsed_module.url.lastIndexOf('/')), '.')}
          </div>
          <div class="w-250px h-150px bg-white pointer-events-none">
            <div class="w-500px h-300px" style="transform: scale(0.5); transform-origin: 0 0;">
              <Iframe src="/sandbox/{module_set.url}" />
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
{/if}
