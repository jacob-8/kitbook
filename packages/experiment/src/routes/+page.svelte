<script lang="ts">
  import { browser } from '$app/environment';
  import type { SvelteComponent } from 'svelte';
  import Child from './Child.svelte';
  import { updatedModules, updatedStories } from './hmrUpdatedModules';

  let UpdatedHello: typeof SvelteComponent;

  import type { PageData } from './$types';

  export let data: PageData;
  let foo: string;

  $: if ($updatedModules) applyUpdates();
  async function applyUpdates() {
    const module = await $updatedModules['/src/routes/foo.variants.ts']();
    foo = module.foo;
    UpdatedHello = (await $updatedStories['/src/.kitbook/Hello.svelte']()).default;
  }
</script>

SSR: {data.fooModule.foo}<br />
ISO: {foo || data.fooModule.foo}<br />
CSR: {foo}<br />

<svelte:component this={UpdatedHello || data.Hello} />

{#if browser}
  <div style="height: 200px; background: red;" />
{/if}

<br />
<Child />

<footer>Foodsasdter</footer>
