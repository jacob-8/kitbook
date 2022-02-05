<script lang="ts">
  import { Variant } from '@vitebook/client';
  import MediaStream from './MediaStream.svelte';
  import { srcObject, Button } from '$lib';
  import Recorder from './Recorder.svelte';
  import type { Options } from 'recordrtc';

  const options: Options = {
    type: 'video',
    mimeType: 'video/webm;codecs=h264', // vp8, vp9, h264, mkv, opus/vorbis
    bitsPerSecond: 256 * 8 * 1024,
    // checkForInactiveTracks: true,
    // timeSlice: 1000,
  };
</script>

<Variant name="Default" description="List Cameras">
  <MediaStream let:stream>
    {#if stream}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video muted volume={0} use:srcObject={stream} autoplay playsinline controls />
      <Recorder {stream} {options} let:start let:stop let:recorder>
        <Button onclick={() => start()}>Start</Button>
        <Button
          onclick={async () => {
            const blob = await stop();
            console.log(blob);
          }}>Stop</Button>
        <Button
          onclick={() => {
            console.log(recorder.getState());
          }}>Log State</Button>
      </Recorder>
    {/if}
  </MediaStream>
</Variant>
