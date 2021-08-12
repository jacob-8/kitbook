<script>
	import Button from '$lib/Button.svelte';
	import { toast } from '$lib/Toasts.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<Button onclick={() => toast('hello')}>Push Toast</Button>

{#await import('$lib/Toasts.svelte') then { default: Toasts }}
	<Toasts />
{/await}
