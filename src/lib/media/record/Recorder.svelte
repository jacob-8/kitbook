<script context="module" lang="ts">
  //   import type * as recordrtc from 'recordrtc';
  //   declare const RecordRTC: recordrtc;
</script>

<script lang="ts">
  //   import { onMount } from 'svelte';
  //   import { loadScriptOnce } from '$lib/helpers/loader';
  // import { invokeSaveAsDialog, RecordRTCPromisesHandler } from 'recordrtc';
  import RecordRTC from 'recordrtc';
  import type { Options } from 'recordrtc';

  export let stream: MediaStream, options: Options;
  // let recorder: RecordRTCPromisesHandler;
  let recorder: RecordRTC;
  $: {
    if (recorder) {
      recorder.stopRecording();
    }
    // recorder = new RecordRTCPromisesHandler(stream, options);
    recorder = new RecordRTC(stream, options);
  }

  //   onMount(async () => {
  // await loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/RecordRTC/5.6.2/RecordRTC.js');
  // RecordRTC = (await import('recordrtc')).default;
  //   });

  async function start() {
    recorder.startRecording();
  }

  function stop(): Promise<Blob> {
    return new Promise((resolve) => {
      recorder.stopRecording(() => {
        let blob = recorder.getBlob();
        resolve(blob);
      });
    });
  }
</script>

<slot {start} {stop} {recorder} />
