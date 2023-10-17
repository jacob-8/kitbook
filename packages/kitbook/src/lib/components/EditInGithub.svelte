<script lang="ts">
  export let path: string
  export let githubURL: string
</script>

{#if githubURL && path}
  <a
    href={githubURL + path}
    class="text-blue-500 hover:text-blue-600 inline-block items-center my-5"
    target="_blank"
    rel="noopener noreferrer">
    <span class="i-iconoir-page-edit text-lg mr-1" />Edit page on GitHub</a>
{/if}
