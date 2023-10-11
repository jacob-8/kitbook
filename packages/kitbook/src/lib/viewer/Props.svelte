<script lang="ts">
  export let props: SvelteComponentDetail['options']['props']

  $: propsWithoutSlotsScope = Object.entries(props).reduce((acc, [key, value]) => {
    if (key === '$$slots' || key === '$$scope' || key === 'data' || key === 'form')
      return acc

    acc[key] = value
    return acc
  }, {} as SvelteComponentDetail['options']['props'])
</script>

<div class="border-t border-gray-300 mt-1 py-1 text-xs">
  {JSON.stringify(propsWithoutSlotsScope, null, 2)}
</div>
