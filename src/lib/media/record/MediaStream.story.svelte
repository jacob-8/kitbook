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
    <MediaStream let:stream>
      <!-- svelte-ignore a11y-media-has-caption -->
      <video muted volume={0} use:srcObject={stream} autoplay playsinline controls />
    </MediaStream>
  </div>
</Variant>
