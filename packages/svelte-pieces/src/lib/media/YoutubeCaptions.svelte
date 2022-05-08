<script lang="ts">
  export let videoId: string;
  import { getCaptions, getTracks } from './captions';
  import type { YoutubeCaption, YoutubeCaptionTrack } from './captions';

  let captions: YoutubeCaption[] = [];
  let track: YoutubeCaptionTrack;

  import { onMount } from 'svelte';
  onMount(async () => {
    const tracks = await getTracks(videoId);
    track = findTrackByOrderPreference(tracks);
    if (track) {
      captions = await getCaptions(videoId, track);
    }
  });

  function findTrackByOrderPreference(tracks: YoutubeCaptionTrack[]) {
    const langCodes = ['zh-Hant', 'zh-TW', 'zh', 'zh-CN', 'zh-Hans'];
    for (const code of langCodes) {
      const preferredTrack = tracks.find(({ langCode }) => langCode === code);
      if (preferredTrack) return preferredTrack;
    }
    return null;
  }
</script>

{#if track}
  <slot {captions} {track} />
  <div>
    {track.langCode}
  </div>
{:else}
  No captions track found
{/if}
