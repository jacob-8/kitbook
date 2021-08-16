<script>
  export let videoId: string;
  import { getCaptions, getTracks } from './captions';

  // import { onMount } from 'svelte';
  // onMount(async () => {
  //   const tracks = await getTracks(videoId);
  //   const enTrack = tracks.find((item) => item.langCode === 'en-GB');
  //   if (!enTrack) throw new Error('English subtitles not found');
  //   const captions = await getCaptions(videoId, enTrack);
  //   console.log(captions);
  // });
</script>

{#await getTracks(videoId) then tracks}
  {#each tracks as track}
    <!-- <pre>{JSON.stringify(track, null, 2)}</pre> -->
    {#if track.langCode === 'zh-TW'}
      {#await getCaptions(videoId, track) then captions}
        <!-- {#each captions as caption}
          <div><b>{caption.start}, {caption.duration}</b>{@html caption.text}</div>
        {/each} -->
        <slot {captions} {track} />
      {/await}
    {:else if track.langCode === 'zh-CN' || track.langCode === 'zh'}
      {#await getCaptions(videoId, track) then captions}
        <slot {captions} {track} />
      {/await}
    {/if}
  {/each}
{/await}
