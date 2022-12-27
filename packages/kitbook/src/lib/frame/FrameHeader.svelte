<script lang="ts">
  export let title: string;
  export let description: string = undefined;
  export let height: number = undefined;
  export let width: number = undefined;
</script>

<div class="bg-gray-50 border rounded overflow-hidden">
  <div class="flex items-center px-2">
    {#if title}
      <div class="font-semibold text-sm py-1">
        {title}
      </div>
    {/if}
    <div class="ml-auto" />

    <!-- i-tabler-code"-->
    <!-- <button
      title="toggle width"
      class="p-1 opacity-50 hover:opacity-100"
      on:click={() => (width ? (width = undefined) : (width = 300))}
      ><span class="i-ant-design-column-width-outlined" /></button
    >
    <button
      title="toggle height"
      class="p-1 opacity-50 hover:opacity-100"
      on:click={() => (height ? (height = undefined) : (height = 200))}
      ><span class="i-ant-design-column-height-outlined" /></button
    > -->
  </div>

  {#if description}
    <div class="text-sm px-2 py-1">{description}</div>
  {/if}

  <div class="border-b" />

  <slot adjustedHeight={height} adjustedWidth={width} />
</div>
