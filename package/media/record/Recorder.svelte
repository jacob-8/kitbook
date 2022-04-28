<script >import { onMount, onDestroy } from 'svelte';
export let stream, options;
let RecordRTC;
let recorder;
let recordingTime = 0;
let interval;
let state;
onMount(async () => {
    RecordRTC = (await import('recordrtc')).default; // Will cause issues w/ making the window object exist and other SSR problems if imported server side
});
$: if (RecordRTC) {
    if (recorder) {
        recorder.stopRecording();
    }
    recorder = new RecordRTC(stream, options);
    state = recorder.getState();
}
function start() {
    recorder.startRecording();
    state = recorder.getState();
    startTimer();
}
function pause() {
    if (state === 'recording') {
        recorder.pauseRecording();
        state = recorder.getState();
        clearInterval(interval);
    }
    else if (state === 'paused') {
        recorder.resumeRecording();
        state = recorder.getState();
        startTimer();
    }
}
function stop() {
    return new Promise((resolve) => {
        clearInterval(interval);
        recordingTime = 0;
        recorder.stopRecording(() => {
            state = recorder.getState();
            let blob = recorder.getBlob();
            resolve(blob);
        });
    });
}
function startTimer() {
    interval = setInterval(() => {
        recordingTime += 1;
    }, 1000);
}
onDestroy(() => recorder && recorder.stopRecording());
</script>

<slot {start} {pause} {stop} {recorder} {recordingTime} {state} />

<style windi:inject>
</style>