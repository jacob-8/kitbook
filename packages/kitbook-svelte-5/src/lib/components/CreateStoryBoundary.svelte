<script lang="ts">
  type Props = {
    children: () => any;
    onerror?: (error: Error, reset: () => void) => void;
    on_create_story?: () => Promise<void>;
  };
  let { children, onerror = (error) => console.error(error), on_create_story }: Props = $props();
</script>

<svelte:boundary {onerror}>
  {@render children()}

  {#snippet failed(error)}
    <div class="border border-red p-2 m-2">
      <div class="overflow-x-auto">
        <b>{(error as Error).message}</b>
      </div>
    </div>
    <button
      class="mx-2 px-2 py-2 bg-blue-500 text-white rounded"
      onclick={on_create_story}>Create Story for Component</button
    >
  {/snippet}
</svelte:boundary>
