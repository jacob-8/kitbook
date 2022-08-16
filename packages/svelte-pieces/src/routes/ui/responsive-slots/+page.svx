<script lang="ts">
  import ResponsiveSlots from '$lib/ui/ResponsiveSlots.svelte';
  import { Story } from 'kitbook';
</script>

# Responsive Slots

Simple proof of concept that paved way for ResponsiveSlideover. Perhaps abstracted too far to be useful. 

<Story name="sm">
  <ResponsiveSlots showWidth="sm">
    content
    <div slot="desktop">desktop</div>
    <div slot="mobile">mobile</div>
  </ResponsiveSlots>
</Story>

<Story name="md">
  <ResponsiveSlots showWidth="md">
    content
    <div slot="desktop">desktop</div>
    <div slot="mobile">mobile</div>
  </ResponsiveSlots>
</Story>

<Story name="lg">
  <ResponsiveSlots showWidth="lg">
    content
    <div slot="desktop">desktop</div>
    <div slot="mobile">mobile</div>
  </ResponsiveSlots>
</Story>

<Story name="xl">
  <ResponsiveSlots showWidth="xl">
    content
    <div slot="desktop">desktop</div>
    <div slot="mobile">mobile</div>
  </ResponsiveSlots>
</Story>
