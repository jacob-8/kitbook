<script lang="ts">
  import { prepareDisplay, prepareHref } from './detectUrl';
  export let string: string;
</script>

<slot display={prepareDisplay(string)} href={prepareHref(string)} />
