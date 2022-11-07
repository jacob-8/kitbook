<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:component this={data?.component} />

<pre>{data.raw}</pre>

<!-- If no story yet then show default message on home route on how to create a story. Set up page matcher to show index file, looking first in   -->

<!-- {#if githubURL}
  <a
    href={githubURL + '/src/routes' + (root || '') + activePage?.path.substring(1)}
    class="text-blue-500 hover:text-blue-600 flex items-center my-5"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="i-iconoir-page-edit text-lg mr-1" />Edit page on GitHub</a
  >
{/if} -->
