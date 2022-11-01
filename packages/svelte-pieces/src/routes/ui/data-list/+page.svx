<script lang="ts">
  import { Story } from 'kitbook';
  // import MultiSelect from '$lib/todo/MultiSelect.svelte';
  import DataList from '$lib/ui/DataList.svelte';
  import BadgeArrayEmit from '$lib/data/BadgeArrayEmit.svelte';
  import ReactiveSet from '$lib/functions/ReactiveSet.svelte';

  let options = [
    { value: 1, display: 'Edge' },
    { value: 2, display: 'Firefox' },
    { value: 3, display: 'Chrome' },
    { value: 4, display: 'Opera' },
    { value: 5, display: 'Safari' },
  ];
</script>

<Story knobs={{ allowAny: false, resetOnSelect: false }} let:props={{ allowAny, resetOnSelect }}>
  <ReactiveSet input={['6: Some Custom Browser']} let:value={editedBooks} let:add let:remove>
    <BadgeArrayEmit
      strings={editedBooks}
      canEdit
      on:itemremoved={(e) => {
        remove(e.detail.value);
      }}
    >
      <span slot="add" />
    </BadgeArrayEmit>
    <DataList
      type="search"
      class="form-input"
      {allowAny}
      {resetOnSelect}
      on:selected={(e) => add(`${e.detail.value}: ${e.detail.display}`)}
    >
      {#each options as option}
        <option data-value={option.value}>{option.display}</option>
      {/each}
    </DataList>
  </ReactiveSet>
</Story>

<!-- <Story height={500}>
  <MultiSelect value={['apple']} placeholder="Select a value">
    {#each ['salt', 'food', 'apple'] as domain}
      <option value={domain}>
        Option # {domain}
      </option>
    {/each}
  </MultiSelect>
</Story> -->
