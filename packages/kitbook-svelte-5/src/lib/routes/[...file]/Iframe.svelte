<script lang="ts">
  interface Props {
    src: string
    block_scripts?: boolean
  }

  const { src, block_scripts = false }: Props = $props()

  let iframe: HTMLIFrameElement = $state()
</script>

{#if block_scripts}
  <iframe bind:this={iframe} sandbox="" class="w-full h-full" title="" {src}></iframe>
{:else}
  <iframe bind:this={iframe} class="w-full h-full" title="" {src}></iframe>
{/if}
