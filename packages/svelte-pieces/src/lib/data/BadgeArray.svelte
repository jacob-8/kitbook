<script lang="ts">
  import Button from '../ui/Button.svelte';
  import Badge from '../ui/Badge.svelte';
  import DetectUrl from '../functions/DetectUrl.svelte';
  import { createEventDispatcher } from 'svelte';

  export let strings: string[] = [];
  export let canEdit = false;
  export let promptMessage: string;
  export let addMessage: string;

  $: if (typeof strings === 'string') {
    strings = [strings];
  }

  const dispatch = createEventDispatcher<{ valueupdated: string[] }>();

  function add() {
    const string = prompt(promptMessage);
    if (!string) return; 
    strings = [...(strings || []), string.trim()];
    dispatch('valueupdated', strings);
  }
</script>

<div class="{$$props.class} flex flex-wrap">
  {#if canEdit}
    {#if strings}
      {#each strings as string, i}
        <DetectUrl {string} let:display let:href>
          <Badge
            {href}
            class="mb-1"
            target="_blank"
            rel="noopener noreferrer"
            onx={() => {
              strings.splice(i, 1);
              strings = strings;
              dispatch('valueupdated', strings);
            }}
          >
            {display}
          </Badge>
          <div class="w-1" />
        </DetectUrl>
      {/each}
    {/if}
    <slot name="add" {add}>
      <Button
        class="mb-1"
        onclick={add}
        color="orange"
        size="sm"
      >
        <span class="i-fa-solid-plus" />
        {addMessage}
      </Button>
    </slot>
  {:else if strings}
    {#each strings as string}
      <DetectUrl {string} let:display let:href>
        <Badge class="mb-1" {href} target="_blank" rel="noopener noreferrer">
          {display}
        </Badge>
        <div class="w-1" />
      </DetectUrl>
    {/each}
  {/if}
</div>
