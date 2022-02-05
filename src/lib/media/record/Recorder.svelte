<script lang="ts">
  import { onDestroy } from 'svelte';
  import RecordRTC from 'recordrtc';
  import type { Options, State } from 'recordrtc';

  export let stream: MediaStream, options: Options;
  let recorder: RecordRTC;
  let recordingTime = 0;
  let interval;
  let state: State;

  $: {
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
