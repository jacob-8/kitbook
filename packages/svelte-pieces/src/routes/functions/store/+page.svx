<script>
	import { Story } from 'kitbook';
	import Store from '$lib/functions/Store.svelte';
	let value = 'world';
</script>

# Store

<Story name="Store + input Event" showCode>
	<Store startWith="hello" let:set let:store={text}>
		<input
			type="text"
			value={text}
			on:input={(e) => {
				//@ts-ignore
				set(e.target.value);
			}}
		/>
		<div>{text}</div>
	</Store>
</Story>

<Story name="2-way binding for comparison">
	<input type="text" bind:value />
	<div>{value}</div>
</Story>
