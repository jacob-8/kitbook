<script lang="ts">
  import { Story } from 'kitbook';
  import ReactiveSet from '$lib/functions/ReactiveSet.svelte';
  import Button from '$lib/ui/Button.svelte';

  let books = ['Kullamazoo', 'foo'];
</script>

# ReactiveSet

<Story knobs={{ firstItem: 'bar' }} let:props={{ firstItem }}>
  <ReactiveSet input={[firstItem, ...books]} let:update let:value let:remove let:add let:size>
    <pre>{JSON.stringify(value, null, 1)}</pre>
    <div>
      Size: {size}
    </div>
    <Button
      onclick={() => {
        const string = prompt('What would you like to add?');
        if (string) {
          add(string.trim());
        }
      }}>Add</Button>
    <Button onclick={() => update(['foo', 'fi', 'fee'])}>Update</Button>
    <Button onclick={() => remove(value[0])}>Remove "{value[0]}"</Button>
  </ReactiveSet>
</Story>
