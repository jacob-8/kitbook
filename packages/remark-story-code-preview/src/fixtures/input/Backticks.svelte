<script lang="ts">
  import { Story } from 'kitbook';
  const id = 'foo';
</script>

<Story>
  <div title={`messages/${id}`}>Hi</div>
</Story>

<Story name="Adjust" knobs={{id: 'foo'}} let:props={{id}} height={200} width={200}>
  <Story name={`messages/${id}`}>
    <div style="background: red;" />
  </Story>
</Story>
