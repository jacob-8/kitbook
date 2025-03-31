<script lang="ts">
  import { dev } from '$app/environment'

  type Props = {
    children: () => any
    onerror?: (error: Error, reset: () => void) => void
  }
  let { children, onerror = (error) => console.error(error) }: Props = $props();
</script>

<svelte:boundary {onerror}>
	{@render children()}

	{#snippet failed(error, reset)}
    <div class="border border-red p-2">
      <div class="overflow-x-auto">
        <b>{(error as Error).message}</b>
        <pre class="font-mono">
          {dev ? (error as Error).stack : ''}
        </pre>
      </div>
      <button class="hover:underline" onclick={reset}>Reset component</button>
    </div>
	{/snippet}
</svelte:boundary>
