<script lang="ts">
  import Button from '$lib/Button.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div style="padding: 10px;">
  <h1>Welcome, <b>{data?.name}</b>!</h1>
  
  <p style="padding-bottom: 20px;">You could build something amazing here.</p>
  
  <Button href="/kitbook">Navigate to template kitbook</Button>
  <Button href="https://kitbook.vercel.app">Open Kitbook Docs</Button>
</div>
