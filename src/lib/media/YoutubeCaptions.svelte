<script lang="ts">
  import { getCaptions, getTracks } from './captions';
  export let videoId: string;
</script>

{#await getTracks(videoId) then tracks}
  {#each tracks as track}
    {#if track.langCode === 'zh-TW'}
      {#await getCaptions(videoId, track) then captions}
        <slot {captions} {track} />
      {/await}
    {:else if track.langCode === 'zh-CN' || track.langCode === 'zh'}
      {#await getCaptions(videoId, track) then captions}
        <slot {captions} {track} />
      {/await}
    {/if}
  {/each}
{/await}
