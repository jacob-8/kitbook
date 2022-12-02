<script lang="ts">
  import { Story } from 'kitbook';
</script>

# Sandbox

This is a page which does not inherit the (main) group layout so it can display components and stories in isolation when loaded via an iframe.

<Story knobs={{name: 'world'}} let:props={{name}}>
  Hello {name}
</Story>
