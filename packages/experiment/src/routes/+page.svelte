<script>
  import { browser } from '$app/environment';
  import { modules } from './modules';
  console.log({ modules });

  export let data;
  console.log({ data: data.fooModule.foo });

  // if (import.meta.hot) {
  //   import.meta.hot.accept((newModule) => {
  //     if (newModule) {
  //       console.log({ newModule });
  //     }
  //   });
  // }
  if (import.meta.hot) {
    import.meta.hot.on('special-update', (greeting) => {
      console.log({ greeting})
    });
  }
</script>

<!-- {#if browser}
  <div style="height: 200px; background: red;" />
{/if} -->

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<!-- {#await modules['/src/routes/foo.variants.ts']()}
  Loading
{:then value}
  {value.foo}
{/await} -->

<!-- {modules['/src/routes/foo.variants.ts'].foo} -->

{data.fooModule.foo}
