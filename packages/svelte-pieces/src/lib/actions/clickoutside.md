<script lang="ts">
  import { Story } from 'kitbook';
  import { clickoutside } from './clickoutside';
</script>

<Story showCode>
  <div class="p-10">
    <div class="p-5 bg-red-300" use:clickoutside on:clickoutside={() => console.log('clicked outside')}>Click outside me</div>
  </div>
</Story>
