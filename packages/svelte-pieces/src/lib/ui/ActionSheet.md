<script lang="ts">
  import { Button } from '$lib';
  import ShowHide from '$lib/functions/ShowHide.svelte';
  import ActionSheet from '$lib/ui/ActionSheet.svelte';
  import { Story } from 'kitbook';
</script>

<!-- prettier-ignore -->
# Action Sheet

TODO

<Story>
  <ShowHide let:show let:toggle>
    <Button size="sm" onclick={toggle} form="filled">Toggle Show</Button>
    <ActionSheet open={show}>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </ActionSheet>
  </ShowHide>
</Story>

<!-- - Let's make this page scroll -->
