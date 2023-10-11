<script lang="ts">
  import { selectedComponent } from '../tree/active'

// function setState(key: string, value: any) {
  //   const state = $selectedComponent.componentDetail.component.$capture_state()
  //   console.log({ state })
  //   $selectedComponent.componentDetail.component.$set({ [key]: value })
  // }
</script>

<div class="flex flex-col">
  {#if $selectedComponent}
    <button type="button">Go to variants.ts file (create if needed, show path as hover title)</button>
    <button type="button">Document on a .svx file</button>
    <button type="button">Create a new .story.svelte file</button>
    <hr class="border-gray">
    <button type="button">Open Kitbook page for component in new Tab</button>
    <!-- <button type="button" on:click={() => setState('lastname', '2')}>Set state on lastname prop: "2"</button> -->
  {:else}
    <div>
      Select a component to view
    </div>
  {/if}
</div>
