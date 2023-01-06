<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { MainPage } from 'kitbook';
</script>

<MainPage {data} />
