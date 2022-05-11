<script lang="ts">
  import { Story } from 'kitbook';
	import Button from '$lib/ui/Button.svelte';
	import { toast } from '$lib/ui/Toasts.svelte';
</script>

<Story name="With Knobs" knobs={{message: 'Hello world', duration: 3000}} let:props={{message, duration}}>
	<Button onclick={() => toast(message, duration)}>Toast</Button>
	{#await import('$lib/ui/Toasts.svelte') then { default: Toasts }}
		<Toasts />
	{/await}
</Story>

### Error: todo