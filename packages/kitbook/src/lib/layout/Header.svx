<script lang="ts">
  import { Story } from '$lib';
  import Header from './Header.svelte';
</script>

<Story>
  <Header activeURL="/foo" />
</Story>

<Story name="active">
  <Header activeURL="/" />
</Story>

<Story name="with slot">
  <Header activeURL="/Somewhere">My Workbench</Header>
</Story>
