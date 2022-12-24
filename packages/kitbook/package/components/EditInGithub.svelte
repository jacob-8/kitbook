<script>import { getContext } from "svelte";
export let path;
const githubURL = getContext("githubUrl");
</script>

{#if githubURL && path}
  <a
    href={githubURL + path}
    class="kb-i6fdzw"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="kb-gjwtne i-iconoir-page-edit" />Edit page on GitHub</a
  >
{/if}

<style>:global(.kb-i6fdzw){margin-top:1.25rem;margin-bottom:1.25rem;display:flex;align-items:center;--un-text-opacity:1;color:rgba(59,130,246,var(--un-text-opacity));}:global(.kb-gjwtne){margin-right:0.25rem;font-size:1.125rem;line-height:1.75rem;}:global(.kb-i6fdzw:hover){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}</style>