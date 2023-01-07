<script lang="ts">
  export let src: string;

  let iframe: HTMLIFrameElement;

  export function reload() {
    iframe?.contentWindow.location.reload();
  }

</script>

<iframe bind:this={iframe} class="w-full h-full" title="" {src} />
