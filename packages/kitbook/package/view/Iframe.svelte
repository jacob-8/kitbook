<script>import { page } from "$app/stores";
import LZString from "lz-string";
const { compressToEncodedURIComponent: encode } = LZString;
export let props;
export let queryParams;
let iframe;
export function reload() {
  iframe?.contentWindow.location.reload();
}
</script>

<iframe
  bind:this={iframe}
  class="kb-wf52cc"
  title=""
  src="/sandbox{$page.url.pathname}?props={encode(JSON.stringify(props))}&{queryParams}"
/>

<style>:global(.kb-wf52cc){height:100%;width:100%;}</style>