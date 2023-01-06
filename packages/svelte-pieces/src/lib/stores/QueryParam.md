<script lang="ts">
  import { Story } from 'kitbook';
  import QueryParam from '$lib/stores/QueryParam.svelte';
  import Button from '$lib/ui/Button.svelte';
  const persist: 'localStorage' | 'sessionStorage' = 'localStorage';
</script>

# Use Query Param Component

<Story
  knobs={{
    key: 'from_component',
    replaceState: true,
    startWith: 'hello',
    log: false,
    persist,
  }}
  let:knobs
>
  <QueryParam {...props} let:value let:set let:remove on:value={(e) => console.log(e.detail)}>
    <pre class="pl-3">{JSON.stringify(value, null, 2)}</pre>
    <Button href="/stores/1-query-param-component?{props.key}=123">nav to 123</Button>
    <Button onclick={() => set('hey')}>Set to 'hey'</Button>
    <Button onclick={remove}>Remove</Button>
  </QueryParam>
</Story>

<Story>
  <QueryParam key="text" startWith="hey" persist="localStorage" let:value let:set on:value={(e) => console.log(e.detail)}>
    <input type="text" {value} on:input={(e) => set(e.currentTarget.value)} placeholder="Type here" />
    <input type="text" {value} on:input={(e) => set(e.currentTarget.value)} placeholder="Type here" />
    <pre class="pl-3">{JSON.stringify(value, null, 2)}</pre>
  </QueryParam>
</Story>

