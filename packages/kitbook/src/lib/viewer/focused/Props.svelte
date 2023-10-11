<script lang="ts">
  import { selectedComponent } from './active'

  function setState(key: string, value: any) {
    const state = $selectedComponent.componentDetail.component.$capture_state()
    console.log({ state })
    $selectedComponent.componentDetail.component.$set({ [key]: value })
  }
</script>

<button type="button" on:click={() => setState('lastname', '2')}>Set state on lastname prop: "2"</button>
