<script lang="ts">
  import Button from '../ui/Button.svelte';
  import Badge from '../ui/Badge.svelte';
  import DetectUrl from '../functions/DetectUrl.svelte';

  export let strings: string[] = [],
    canEdit = false,
    addMessage: string;

  $: if (typeof strings === 'string') {
    strings = [strings];
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    itemclicked: { value: string; index: number };
    itemremoved: { value: string; index: number };
    additem: boolean;
  }>();
</script>

<div class="{$$props.class} flex flex-wrap">
  {#if canEdit}
    {#if strings}
      {#each strings as string, index}
        <DetectUrl {string} let:display let:href>
          <Badge
            {href}
            class="mb-1"
            target="_blank"
            onclick={() => dispatch('itemclicked', { value: string, index })}
            onx={() => dispatch('itemremoved', { value: string, index })}>
            {display}
          </Badge>
          <div class="w-1" />
        </DetectUrl>
      {/each}
    {/if}
    <Button class="mb-1" onclick={() => dispatch('additem')} color="orange" size="sm">
      <span class="i-fa-solid-plus" />
      {addMessage}
    </Button>
  {:else if strings}
    {#each strings as string}
      <DetectUrl {string} let:display let:href>
        <Badge class="mb-1" {href} target="_blank">
          {display}
        </Badge>
        <div class="w-1" />
      </DetectUrl>
    {/each}
  {/if}
</div>
