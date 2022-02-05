<script>
  import { Variant } from '@vitebook/client';
  import MediaStream from './MediaStream.svelte';

  function srcObject(node, stream) {
    node.srcObject = stream;
    return {
      update(newStream) {
        if (node.srcObject != newStream) {
          node.srcObject = newStream;
        }
      },
    };
  }
</script>

<Variant name="Default" description="List Cameras">
  <div>
    <MediaStream let:stream let:microphones let:cameras>
      <!-- <div>
  <pre>{JSON.stringify(devices, null, 1)}</pre>
  <pre>{JSON.stringify(cameras, null, 1)}</pre>
  <pre>{JSON.stringify(microphones, null, 1)}</pre>
</div> -->

      {#each microphones as microphone}
        <div>
          <button on:click={() => selectMicrophone(microphone)}>{microphone.label}</button>
        </div>
      {/each}

      {#each cameras as camera}
        <div>
          <button on:click={() => selectCamera(camera)}>{camera.label}</button>
        </div>
      {/each}

      {#if stream}
        Recording
        <!-- svelte-ignore a11y-media-has-caption -->
        <video muted volume={0} use:srcObject={stream} autoplay playsinline controls />
      {/if}
    </MediaStream>
  </div>
</Variant>
