<script>export let src;
let iframe;
export function reload() {
  iframe?.contentWindow.location.reload();
}
</script>

<iframe bind:this={iframe} class="kb-wf52cc" title="" {src} />

<style>:global(.kb-wf52cc){height:100%;width:100%;}</style>