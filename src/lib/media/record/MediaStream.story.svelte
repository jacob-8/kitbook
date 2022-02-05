<script>
  import Button from '$lib/ui/Button.svelte';
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
    <MediaStream
      let:stream
      let:microphones
      let:cameras
      let:chooseMicrophone
      let:chooseCamera
      let:selectedMicrophone
      let:selectedCamera>
      {#each microphones as microphone}
        <div>
          <Button
            onclick={() => chooseMicrophone(microphone)}
            form={selectedMicrophone.deviceId === microphone.deviceId ? 'primary' : 'simple'}
            >{microphone.label}</Button>
        </div>
      {/each}

      {#each cameras as camera}
        <div>
          <Button
            onclick={() => chooseCamera(camera)}
            form={selectedCamera.deviceId === camera.deviceId ? 'primary' : 'simple'}
            >{camera.label}</Button>
        </div>
      {/each}

      {#if stream}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video muted volume={0} use:srcObject={stream} autoplay playsinline controls />
      {/if}
    </MediaStream>
  </div>
</Variant>
