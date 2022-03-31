<script lang="ts">
	import Button from './Button.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ change: { value: string } }>();

	export let headings: { title: string; key: string }[] = [];
	export let value: string;

	onMount(() => focusActive(`#${value}`));
	$: typeof window !== 'undefined' && focusActive(`#${value}`);

	function focusActive(el: string) {
		document.querySelector(el)?.scrollIntoView({ inline: 'center' });
	}
</script>

<section>
	<header class="{$$props.class} space-x-1 p-1">
		{#each headings as heading}
			<div id={heading.key}>
				<Button
					form="menu"
					active={value === heading.key}
					onclick={() => {
						value = heading.key;
						dispatch('change', { value: heading.key });
					}}
				>
					{heading.title}
				</Button>
			</div>
		{/each}
	</header>
	<slot />
</section>

<style>
	header {
		@apply flex overflow-x-auto whitespace-nowrap;
	}
</style>
