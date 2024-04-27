<script lang="ts">
  import { browser, dev } from '$app/environment'
  import Image from '$lib/Image.svelte'

  export let data
</script>

<div style="padding: 10px;">
  <h1>Welcome, <b>{data.name || 'everyone'}</b>!</h1>

  <p style="margin-bottom: 10px;">You could build something amazing here, like an Image component.</p>

  <div style="display: flex; flex-gap:10px;">
    {#each data.image_seeds as seed}
      <Image {seed} />
      <div style="width: 10px; height: 10px;"></div>
    {/each}
  </div>

  <div style="margin-top: 10px;">
    <a href="/kitbook" style="color: blue; text-decoration: underline;">Open Kitbook</a> to view the components and their props, variants, and more.
  </div>
  {#if dev}
    <div style="margin: 10px 0;">As well you could press Alt+Shift to put Kitbook Viewer into targeting mode, then right-click on a component to view it's props, variants, or jump directly to it in Kitbook. Try change this image's seed prop and watching it update right here, or try changing the page's data.name prop.</div>

    {#if browser && window.self !== window.top}
      <div style="color: red;">
        If you're in a Stackblitz iframe, pop the preview out into its own tab so the inter-window communication between the main page and the Tools popup will work  </div>
    {/if}
  {/if}
</div>

<svelte:head>
  <title>Kitbook Template</title>
</svelte:head>
