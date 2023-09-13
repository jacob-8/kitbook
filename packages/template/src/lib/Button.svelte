<script lang="ts">
  export let href: string;
  export let site = "Kitbook";
</script>

<a {href}>
  <slot>Open {site} Docs</slot>
</a>

<style>
  a {
    background: pink; 
    padding: 5px; 
    border-radius: 4px;
  }
</style>