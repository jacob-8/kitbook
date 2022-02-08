<script lang="ts">
  import { Variant } from '@vitebook/client';
  import { eventCallback, EventsAddon } from '@vitebook/client/addons';
  import Button from './Button.svelte';
  const colors: ('red' | 'orange' | 'green' | 'black' | 'white' | 'primary')[] = [
    'primary',
    'red',
    'orange',
    'green',
    'black',
    'white',
  ];
</script>

<EventsAddon />

<Variant name="Stacked menu">
  <div class="flex flex-col p-2 space-y-1 w-96">
    <Button href="/" form="menu">Home</Button>
    <Button href="/" form="menu" active={true}>About</Button>
    <Button href="/" form="menu">Settings</Button>
    <Button href="/" form="link">Terms</Button>
  </div>
</Variant>

<Variant name="External link size">
  <Button href="/" size="sm" target="_blank">sm link</Button>
  <Button href="/" target="_blank">link</Button>
  <Button href="/" size="lg" target="_blank">lg link</Button>
</Variant>

<Variant name="Forms">
  <Button href="/">Outline link</Button>
  <Button form="filled" href="/">Filled link</Button>
  <Button form="simple" href="/">Simple link</Button>
</Variant>

<Variant name="Colors">
  <button class="font-medium text-sm px-4 py-2 text-indigo-700 border border-indigo-500 rounded focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100">Outline</button>
  {#each colors as color}
    <div class="my-1 flex justify-around">
      <Button onclick={eventCallback} {color}>{color}</Button>
      &nbsp;
      <Button href="/" {color} form="filled">{color}</Button>
      &nbsp;
      <Button onclick={eventCallback} {color} form="simple">{color}</Button>
    </div>
  {/each}
</Variant>

<Variant name="White (on dark)">
  <div class="bg-gray-900 p-2 text-center">
    <Button onclick={() => {}} color="white" form="filled" size="lg">Primary white</Button>
  </div>
</Variant>

<Variant name="Loading state">
  <Button
    onclick={async () =>
      await new Promise((resolve) => {
        console.log('Clicked');
        setTimeout(resolve, 1000);
      })}>1-second Log click</Button>
  <Button onclick={() => alert('Should never show')} loading>Save</Button>
</Variant>

<Variant name="disabled click">
  <Button disabled onclick={() => alert('Should never show')}>Disabled button</Button>
</Variant>

<Variant name="lg click">
  <Button onclick={() => alert('Clicked')} size="lg">Alert me</Button>
</Variant>

<Variant name="ctrl click">
  <Button onclick={({ ctrlKey }) => alert(`${{ ctrlKey }}`)}>Click with Ctrl</Button>
</Variant>

<Variant name="text">
  <Button form="text">Log In</Button>
</Variant>
