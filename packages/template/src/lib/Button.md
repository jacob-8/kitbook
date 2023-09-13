<script lang="ts">
  import { Story } from 'kitbook';
  import Button from './Button.svelte';
</script>

# Button with a Story and Variants

<Story
  knobs={{ href: 'https://kitbook.vercel.app', text: 'Kitbook Home' }}
  let:knobs={{ href, text }}
>
  <Button {href}>{text}</Button>
</Story>

Try changing the knob to `/` and click it to navigate to that page (inside the iframe).
