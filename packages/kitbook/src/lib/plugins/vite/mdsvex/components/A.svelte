<script lang="ts">
  export let title: string = undefined;
  export let href: string;

  let data: HTMLSpanElement;
  $: alias = extractAlias(data?.innerText);

  const findAliasRgx = /\|(.*)/;
  function extractAlias(str: string): string | null {
    const match = str?.match(findAliasRgx);
    return match?.[1];
  }
</script>

<span class="hidden" bind:this={data}><slot /></span><a
  {href}
  class:text-blue-500={title}
  class:px-1px={title}
>
  {#if alias}
    {alias}
  {:else if title}
    {title}
  {:else}
    <slot />
  {/if}
</a>
