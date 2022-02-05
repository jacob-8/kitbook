<script context="module" lang="ts">
  import { writable } from 'svelte/store';
  let selectedMicrophone = writable<MediaDeviceInfo>(null);
  let selectedCamera = writable<MediaDeviceInfo>(null);
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  let stream: MediaStream;
  let devices: MediaDeviceInfo[] = [];
  $: microphones = devices.filter((d) => d.kind === 'audioinput');
  $: cameras = devices.filter((d) => d.kind === 'videoinput');
  $: {
    if (!$selectedMicrophone) {
      selectedMicrophone.set(microphones[0]);
    }
    if (!$selectedCamera) {
      selectedCamera.set(cameras[0]);
    }
  }

  onMount(async () => {
    console.log($selectedMicrophone);
    try {
      stream = await requestStream();
      devices = await navigator.mediaDevices.enumerateDevices();
    } catch (e) {
      console.log(e.name + ': ' + e.message);
    }
  });

  function requestStream() {
    closeStream();
    const constraints = {
      audio: {
        deviceId: $selectedMicrophone ? { exact: $selectedMicrophone.deviceId } : undefined,
      },
      video: {
        deviceId: $selectedCamera ? { exact: $selectedCamera.deviceId } : undefined,
      },
    };
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  function closeStream() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
  }

  async function chooseMicrophone(microphone: MediaDeviceInfo) {
    selectedMicrophone.set(microphone);
    stream = await requestStream();
  }
  async function chooseCamera(camera: MediaDeviceInfo) {
    selectedCamera.set(camera);
    stream = await requestStream();
  }

  onDestroy(() => closeStream());
</script>

<slot
  {stream}
  {closeStream}
  {microphones}
  {cameras}
  {chooseMicrophone}
  {chooseCamera}
  selectedMicrophone={$selectedMicrophone}
  selectedCamera={$selectedCamera} />

<!-- Learned from https://ourcodeworld.com/articles/read/1090/how-to-switch-from-front-camera-to-rear-camera-facing-back-with-javascript-html5-in-the-browser -->
