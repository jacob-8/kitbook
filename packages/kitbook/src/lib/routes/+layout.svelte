<script lang="ts">
  // @ts-expect-error virtual module
  import { WrapRootLayout } from 'virtual:kitbook-modules';
</script>

<svelte:component this={WrapRootLayout}>
  <slot />
</svelte:component>
