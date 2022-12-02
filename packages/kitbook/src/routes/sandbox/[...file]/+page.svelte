<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  import { setContext } from 'svelte';
  // Use the `storyId` query param to pass this context value to `Story` components when displaying a stories file, `.svx/.md`, inside the Sandbox page to identify which individual `Story` component to show. This has no effect on showing variants of components, enumerated in a `*.variants.ts` file.
  setContext<string>('sandboxId', data.storyId);
</script>

<div id="sandbox" class="border p-3">
  <svelte:component this={data.component} {...data.props || {}} />
</div>

<style>
  :global(#sandbox > :not(.show-in-sandbox)) {
    display: none;
  }
</style>
