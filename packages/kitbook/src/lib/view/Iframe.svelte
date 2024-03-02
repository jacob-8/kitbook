<script lang="ts">
  export let src: string
  export let blockScripts = false

  let iframe: HTMLIFrameElement
</script>

{#if blockScripts}
  <iframe bind:this={iframe} sandbox="" class="w-full h-full" title="" {src} />
{:else}
  <iframe bind:this={iframe} class="w-full h-full" title="" {src} />
{/if}
