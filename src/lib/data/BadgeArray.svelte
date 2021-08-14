<script>
  import Button from '../ui/Button.svelte';
  import Badge from '../ui/Badge.svelte';
  import DetectUrl from '../functions/DetectUrl.svelte';

  export let strings: string[] = [],
    canEdit = false,
    promptMessage: string,
    addMessage: string;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ valueupdated: string[] }>();
</script>

<div class="flex flex-wrap space-x-1">
  {#if canEdit}
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
      </DetectUrl>
    {/each}
    <Button
      class="mb-1"
      onclick={() => {
        const string = prompt(promptMessage);
        if (string) {
          strings = [...strings, string.trim()];
          dispatch('valueupdated', strings);
        }
      }}
      color="orange"
      size="sm">
      {addMessage}
    </Button>
  {:else}
    {#each strings as string}
      <DetectUrl {string} let:display let:href>
        <Badge class="mb-1" {href} target="_blank">
          {display}
        </Badge>
      </DetectUrl>
    {/each}
  {/if}
</div>
