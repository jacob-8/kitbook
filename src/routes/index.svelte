<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import { toast } from '$lib/ui/Toasts.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<Button onclick={() => toast('hello')}>Push Toast</Button>

{#await import('$lib/ui/Toasts.svelte') then { default: Toasts }}
	<Toasts />
{/await}
