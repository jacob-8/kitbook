<script lang="ts">
  import type { PageData } from './$types'
  import Button from '$lib/Button.svelte'

  export let data: PageData
</script>

<div style="padding: 10px;">
  <h1>Welcome, <b>{data?.name}</b>!</h1>

  <p style="padding-bottom: 20px;">You could build something amazing here.</p>

  <Button href="/kitbook">Navigate to template kitbook</Button>
  <Button href="https://kitbook.vercel.app">Open Kitbook Docs</Button>

  <div style="margin-top: 10px;">As well you could use the target icon in the lower right corner to open the Kitbook Viewer, and click on a Button to view it's props, variants, or jump directly to it in Kitbook.</div>
</div>
