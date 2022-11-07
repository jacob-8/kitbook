<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

Welcome {data?.name}<br />
<a href="/kitbook">Kitbook</a>
