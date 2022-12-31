<script lang="ts">
  import { page } from '$app/stores';
  import LZString from 'lz-string';
  const { compressToEncodedURIComponent: encode } = LZString;

  export let props: any;
  export let queryParams: string;

  let iframe: HTMLIFrameElement;
  
  export function reload() {
    iframe?.contentWindow.location.reload();
  }
</script>

<iframe
  bind:this={iframe}
  class="w-full h-full"
  title=""
  src="/sandbox{$page.url.pathname}?props={encode(JSON.stringify(props))}&{queryParams}"
/>
