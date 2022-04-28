<script context="module" >import { writable } from 'svelte/store';
let selectedMicrophone = writable(null);
let selectedCamera = writable(null);
</script>

<script >import { onDestroy, onMount } from 'svelte';
export let audio = true, video = true;
let stream;
let devices = [];
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
    try {
        stream = await requestStream();
        devices = await navigator.mediaDevices.enumerateDevices();
    }
    catch (e) {
        console.log(e.name + ': ' + e.message);
    }
});
function requestStream() {
    closeStream();
    const constraints = {
        audio: audio
            ? {
                deviceId: $selectedMicrophone ? { exact: $selectedMicrophone.deviceId } : undefined,
            }
            : false,
        video: video
            ? {
                deviceId: $selectedCamera ? { exact: $selectedCamera.deviceId } : undefined,
            }
            : false,
    };
    return navigator.mediaDevices.getUserMedia(constraints);
}
function closeStream() {
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
    }
}
async function chooseMicrophone(microphone) {
    selectedMicrophone.set(microphone);
    stream = await requestStream();
}
async function chooseCamera(camera) {
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



<style windi:inject>
</style>