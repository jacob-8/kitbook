<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import { toast } from '$lib/ui/Toasts.svelte';
</script>

# Svelte Pieces

Install with `npm i -D svelte-pieces`.

Built using Kitbook, Windicss, and Iconify icons - you don't need Tailwind nor Windi installed for these components to work properly as the classes get generated at packaging time.

## Smoke Test
<Button onclick={() => toast('hello')}>Push Toast</Button>

{#await import('$lib/ui/Toasts.svelte') then { default: Toasts }}
	<Toasts />
{/await}
