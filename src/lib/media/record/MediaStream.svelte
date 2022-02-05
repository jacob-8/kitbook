<script lang="ts">
  import { onMount } from 'svelte';

  let stream: MediaStream;

  let devices: MediaDeviceInfo[] = [];
  $: cameras = devices.filter((d) => d.kind === 'videoinput');
  $: microphones = devices.filter((d) => d.kind === 'audioinput');
  let selectedCamera: MediaDeviceInfo;
  let selectedMicrophone: MediaDeviceInfo;

  onMount(async () => {
    try {
      stream = await requestStream();
      devices = await navigator.mediaDevices.enumerateDevices();
      closeStream();
    } catch (e) {
      console.log(e.name + ': ' + e.message);
    }
  });

  function requestStream({microphoneDeviceId: string, cameraDeviceId: string} = {}) {
    closeStream();
    const constraints = {
      audio: {
        deviceId: microphoneDeviceId ? { exact: microphoneDeviceId } : undefined,
      },
      video: {
        deviceId: cameraDeviceId ? { exact: cameraDeviceId } : undefined,
      },
    };
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  function closeStream() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }

  async function selectCamera(camera: MediaDeviceInfo) {
    selectedCamera = camera;
    stream = await requestStream();
  }
  async function selectMicrophone(microphone: MediaDeviceInfo) {
    selectedMicrophone = microphone;
    stream = await requestStream();
  }
</script>

<slot {stream} {devices} {cameras} {microphones} />

<!-- Learned from https://ourcodeworld.com/articles/read/1090/how-to-switch-from-front-camera-to-rear-camera-facing-back-with-javascript-html5-in-the-browser -->
