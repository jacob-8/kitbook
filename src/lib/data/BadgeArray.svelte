<script lang="ts">
  import Button from '../ui/Button.svelte';
  import Badge from '../ui/Badge.svelte';
  import DetectUrl from '../functions/DetectUrl.svelte';

  export let strings: string[] = [],
    canEdit = false,
    promptMessage: string,
    addMessage: string;

  $: if (typeof strings === 'string') {
    strings = [strings];
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ valueupdated: string[] }>();
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
            onx={() => {
              strings.splice(i, 1);
              strings = strings;
              dispatch('valueupdated', strings);
            }}>
            {display}
          </Badge>
          <div class="w-1" />
        </DetectUrl>
      {/each}
    {/if}
    <Button
      class="mb-1"
      onclick={() => {
        const string = prompt(promptMessage);
        if (string) {
          if (strings) {
            strings = [...strings, string.trim()];
          } else {
            strings = [string.trim()];
          }
          dispatch('valueupdated', strings);
        }
      }}
      color="orange"
      size="sm">
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
