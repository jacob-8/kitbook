<script lang="ts">
  import { Story } from 'kitbook';
  import SplitPane from './SplitPane.svelte';
</script>

# Split Pane

<Story name="Position 30" height={400}>
  <SplitPane pos={30}>
    <section class="bg-black text-white h-full text-center" slot="a">Slot A</section>
    <section class="text-center" slot="b">Slot B</section>
  </SplitPane>
</Story>

<Story
  name="Vertical and Brown Hover"
  knobs={{ vertical: true, pos: '10-90;50' }}
  let:props={{ vertical, pos }}
  height={400}
>
  <SplitPane
    dividerHoverColor="hsl(43, 53%, 70%)"
    type={vertical ? 'vertical' : 'horizontal'}
    pos={+pos}
  >
    <section class="bg-black text-white h-full text-center" slot="a">Slot A</section>
    <section class="text-center" slot="b">Slot B</section>
  </SplitPane>
</Story>

<Story name="No divider color">
  <SplitPane dividerHoverColor={null}>
    <section class="bg-black text-white h-full text-center" slot="a">Slot A</section>
    <section class="text-center" slot="b">Slot B</section>
  </SplitPane>
</Story>

- learned much from https://github.com/sveltejs/svelte-repl/blob/master/src/Repl.svelte 
- can improve further from https://github.com/orefalo/svelte-splitpanes
