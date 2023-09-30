<script lang="ts">
import type { ViewerOptions } from "@kitbook/vite-plugin-kitbook";

import { onMount } from 'svelte';
  export let options: ViewerOptions = {};

  onMount(() => {
		document.addEventListener('SvelteRegisterComponent', ({ detail }) => {
			const { component, tagName } = detail;
			console.log({ [tagName]: component });
		});
    console.log({ options });
  });
</script>

<!-- <div class="fixed right-0 bottom-0 top-0 w-50vw bg-black">
	hello
</div> -->
<button class="fixed right-0 bottom-0 bg-white border z-1" on:click={() => alert('hello')}
  >X marks the spot</button
>
