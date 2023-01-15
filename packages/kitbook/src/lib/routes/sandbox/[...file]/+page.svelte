<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import SandboxPage from '../../../pages/SandboxPage.svelte';
</script>

<SandboxPage {data} />
