<script lang="ts">
  import { Story } from 'kitbook';
  import Button from '$lib/ui/Button.svelte';
  let text = 'sample message';
</script>

<!-- prettier-ignore -->
# Copy

<Story name="Input message">
  <input bind:value={text} />
  <Button
    onclick={async () => {
      navigator.clipboard.writeText(text);
      const clip = await navigator.clipboard.readText();
      console.log('copied', clip);
    }}>Copy</Button>
</Story>

*(too simple to need a component)*
