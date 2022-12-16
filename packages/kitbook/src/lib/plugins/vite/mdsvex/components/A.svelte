<script lang="ts">
  export let title: string;
  export let href: string;
</script>

<a {href}>
  {#if title}
    {title}
  {:else}
    <slot />
  {/if}
</a>
