<script lang="ts">
  import { componentsWithChildren } from './compiledNodes'
  import Component from './Component.svelte'
</script>

<div class="fixed right-10px bottom-10px rounded max-h-50vh max-w-50vw border border-gray bg-white overflow-y-auto flex flex-col z-9999999">
  <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
  {#each [...$componentsWithChildren] as [_fragment, { componentDetail, childComponents }] (_fragment)}
    {#if componentDetail.tagName === 'Root'}
      <!-- use spread for Svelte 3 compatibility, not needed in Svelte 4 -->
      {#each [...childComponents] as componentFragment (componentFragment)}
        <Component {componentFragment} componentsWithChildren={$componentsWithChildren} />
      {/each}
    {/if}
  {/each}
</div>
