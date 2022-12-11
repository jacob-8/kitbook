<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  target="_blank"
  rel="noreferrer"
  style="background: pink; padding: 5px; border-radius: 4px;"
>
  <slot>Open Kitbook Docs</slot>
</a>
