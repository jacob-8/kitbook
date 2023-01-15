<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import MainPage from '../../../pages/MainPage.svelte';
</script>

<MainPage {data} />
