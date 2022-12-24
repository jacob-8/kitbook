<script lang="ts">
  import { Story } from 'kitbook';
  const id = 'foo';
</script>

<Story code={`<div title=&#123;&#96;messages/$&#123;id&#125;&#96;&#125;>Hi</div>`}>
  <div title={`messages/${id}`}>Hi</div>
</Story>

<Story code={`<Story name=&#123;&#96;messages/$&#123;id&#125;&#96;&#125;>
  <div style="background: red;" />
</Story>`} name="Adjust" knobs={{id: 'foo'}} let:props={{id}} height={200} width={200}>
  <Story code={`<div style="background: red;" />`} name={`messages/${id}`}>
    <div style="background: red;" />
  </Story>
</Story>
