<script lang="ts">
  export let href: string;
  export let site = "Kitbook";
</script>

<a {href} style="background: pink; padding: 5px; border-radius: 4px;">
  <slot>Open {site} Docs</slot>
</a>
