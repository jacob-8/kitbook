<script lang="ts">
	import { tick, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let text: string;
	let textarea: HTMLTextAreaElement;

	async function copy() {
		textarea.select();
		document.execCommand('Copy');
		await tick();
		textarea.blur();
		dispatch('copy');
	}

	// Usage example:
	// <Copy text={message} let:copy>
	// 	<Button size="sm" form="simple" color="black" onclick={copy}>
	// 		<i class="fas fa-copy" />
	// 	</Button>
	// </Copy>;
</script>

<slot {copy} />
<textarea bind:this={textarea} value={text} />

<style>
	textarea {
		opacity: 0;
		width: 1px;
		height: 1px;
		position: fixed;
		pointer-events: none;
	}
</style>
