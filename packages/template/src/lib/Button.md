<script lang="ts">
  import { Story } from 'kitbook';
  import Button from './Button.svelte';
  function foo(node: string) {
    return 'hello';
  }
</script>

# Button

<Story knobs={{ href: 'https://kitbook.vercel.app', text: 'Kitbook Home' }} let:props={{ href }}>
  <Button {href}>Kitbook Home</Button>
</Story>

Try changing the knob to `/` and click it to navigate to that page (inside the iframe).