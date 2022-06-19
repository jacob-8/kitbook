<script lang="ts">
  import ShowHide from '$lib/functions/ShowHide.svelte';
  import Button from '$lib/ui/Button.svelte';
  import Slideover from '$lib/ui/Slideover.svelte';
  import { Story } from 'kitbook';
</script>

<Story name="title slot"
  knobs={{ duration: 200, zIndex: 50, rightSide: true }}
  let:props={{ duration, zIndex, rightSide }}
>
  <ShowHide let:show let:toggle>
    <Button onclick={toggle}>Show</Button>
    {#if show}
      <Slideover {duration} {zIndex} side={rightSide ? 'right' : 'left'} on:close={toggle}>
        <div slot="title">Hello</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
      </Slideover>
    {/if}
  </ShowHide>
</Story>

<Story name="heading slot"
  knobs={{ duration: 200, zIndex: 50, rightSide: true }}
  let:props={{ duration, zIndex, rightSide }}
>
  <ShowHide let:show let:toggle>
    <Button onclick={toggle}>Show</Button>
    {#if show}
      <Slideover {duration} {zIndex} side={rightSide ? 'right' : 'left'} on:close={toggle}>
        <!-- <div class="text-lg font-medium text-gray-900 p-3 border-b border-gray-300" slot="heading">
          Hello
        </div> -->
        <div slot="heading" class="flex items-start justify-between border-b border-gray-300">
          <h3 class="text-lg font-medium text-gray-900 p-3" id="modal-headline">
            Hello
          </h3>
          <button
            on:click={toggle}
            type="button"
            class="text-gray-400 px-3 py-4 flex hover:text-gray-500 focus:outline-none
      focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close"
          >
            <span class="i-fa-solid-times text-lg" /></button
          >
        </div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
        <div class="p-3">Foo</div>
      </Slideover>
    {/if}
  </ShowHide>
</Story>
