<script lang="ts">
  import Button from '$lib/Button.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>Welcome to My App, {data?.name}</h1>

<p>You built something amazing here. Try ____ to open the Kitbook for this demo app.</p>

<Button route="/kitbook" />
