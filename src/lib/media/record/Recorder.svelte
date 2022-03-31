<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type RecordRTCType from 'recordrtc';
  import type { Options, State } from 'recordrtc';

  export let stream: MediaStream, options: Options;
  let RecordRTC: typeof RecordRTCType;
  let recorder: RecordRTCType;
  let recordingTime = 0;
  let interval;
  let state: State;

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
    } else if (state === 'paused') {
      recorder.resumeRecording();
      state = recorder.getState();
      startTimer();
    }
  }

  function stop(): Promise<Blob> {
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
