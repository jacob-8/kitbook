<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { page } from '$app/stores';
  import { compressToEncodedURIComponent as encode } from 'lz-string';
  import EditInGithub from '$lib/components/EditInGithub.svelte';
</script>

{#if data.loadedModules.svx}
  <svelte:component this={data.loadedModules.svx} />
{/if}

{#if data.loadedModules.variants}
  <div class="mt-10 text-2xl">
    {data.loadedModules.componentRaw ? 'Component' : 'Page'} Variants
  </div>
  {#each data.loadedModules.variants as variant}
    <div class="not-prose border rounded mt-3">
      <div class="bg-gray-200 p-3 mb-2">
        <span class="font-semibold">
          {variant.name}
        </span>
        {#if variant.description}
          <div class="text-sm">
            {variant.description}
          </div>
        {/if}
      </div>
      {#if $page.url.pathname.startsWith('/routes/sandbox')}
        <svelte:component this={data.loadedModules.page} {...variant.props || {}} />
      {:else}
        <iframe
          class="w-full h-full"
          title=""
          src="/sandbox/{$page.url.pathname}?props={encode(JSON.stringify(variant.props || {}))}"
        />
      {/if}
    </div>
  {/each}
{:else}
  <!-- When no variants provided, place sandboxed component here with default props based off component types -->
{/if}

<EditInGithub githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/kitbook" path={data.page.path} />

<!-- By default Kitbook will try to display your project's README.md file as it's home page if no src/docs/index.md (.svx) file exists.<br /><br /> -->
