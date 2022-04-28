<script >import Button from './Button.svelte';
import { createEventDispatcher, onMount } from 'svelte';
const dispatch = createEventDispatcher();
export let headings = [];
export let value;
onMount(() => focusActive(`#${value}`));
$: typeof window !== 'undefined' && focusActive(`#${value}`);
function focusActive(el) {
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

<style windi:inject>
header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
}

.space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.p-1 {
  padding: 0.25rem;
}
</style>
