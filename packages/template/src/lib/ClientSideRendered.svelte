<script lang="ts">
  export let name: string
</script>

{#await new Promise(resolve => setTimeout(resolve, 400))}
  Promise not resolved (indicates SSR)
{:then _value}
  Hello, {name}, on the client!
{/await}
