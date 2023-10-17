<script lang="ts">
  import { MainPage } from 'kitbook'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<MainPage {data} />
