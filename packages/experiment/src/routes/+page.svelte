<script>
  import { browser } from '$app/environment';
  import { updatedModules } from './hmrUpdatedModules';

  export let data;
  let foo;

  $: if ($updatedModules) applyUpdates();
  async function applyUpdates() {
    const module = await $updatedModules['/src/routes/foo.variants.ts']();
    console.log({ updatedfoo: module.foo });
    foo = module.foo;
  }
</script>

SSR: {data.fooModule.foo}<br />
ISO: {foo || data.fooModule.foo}<br />
CSR: {foo}

{#if browser}
  <div style="height: 200px; background: red;" on:click={applyUpdates} />
{/if}
