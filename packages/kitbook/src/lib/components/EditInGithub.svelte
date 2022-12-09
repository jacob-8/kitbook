<script lang="ts">
  import { getContext } from 'svelte';
  export let path: string;
  const githubURL = getContext<string>('githubUrl');
</script>

{#if githubURL}
  <a
    href={githubURL + path}
    class="text-blue-500 hover:text-blue-600 flex items-center my-5"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="i-iconoir-page-edit text-lg mr-1" />Edit page on GitHub</a
  >
{/if}
