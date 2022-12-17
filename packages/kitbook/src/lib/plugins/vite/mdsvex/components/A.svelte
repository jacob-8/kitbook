<script lang="ts">
  export let title: string;
  export let href: string;
</script>

<a {href} class:text-blue-500={title} class:px-1px={title}>
  {#if title}
    {title}
  {:else}
    <slot />
  {/if}
</a>
