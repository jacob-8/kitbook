<script lang="ts">
  import type { KitbookSettings } from 'kitbook';
  import { getContext } from 'svelte';
  export let path: string;
  const settings = getContext<KitbookSettings>('kitbook-settings');
</script>

{#if settings?.githubURL && path}
  <a
    href={settings.githubURL + path}
    class="text-blue-500 hover:text-blue-600 flex items-center my-5"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="i-iconoir-page-edit text-lg mr-1" />Edit page on GitHub</a
  >
{/if}
