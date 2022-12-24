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
    <span class="kb-ojlr76" />Edit page on GitHub</a
  >
{/if}

<style>:global(.kb-ojlr76){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='M20 12V5.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 16.252 2H4.6a.6.6 0 0 0-.6.6v18.8a.6.6 0 0 0 .6.6H11M8 10h8M8 6h4m-4 8h3m6.954 2.94l1-1a1.121 1.121 0 0 1 1.586 0v0a1.121 1.121 0 0 1 0 1.585l-1 1m-1.586-1.586l-2.991 2.991a1 1 0 0 0-.28.553l-.244 1.557l1.557-.243a1 1 0 0 0 .553-.28l2.99-2.992m-1.585-1.586l1.586 1.586'/%3E%3Cpath d='M16 2v3.4a.6.6 0 0 0 .6.6H20'/%3E%3C/g%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;margin-right:0.25rem;font-size:1.125rem;line-height:1.75rem;}:global(.kb-i6fdzw){margin-top:1.25rem;margin-bottom:1.25rem;display:flex;align-items:center;--un-text-opacity:1;color:rgba(59,130,246,var(--un-text-opacity));}:global(.kb-i6fdzw:hover){--un-text-opacity:1;color:rgba(37,99,235,var(--un-text-opacity));}</style>