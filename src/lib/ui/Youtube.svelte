<script context="module">
  export const PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  };

  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(script);

  let iframeApiReady = false;

  //@ts-ignore
  window.onYouTubeIframeAPIReady = () => {
    window.dispatchEvent(new Event('iframeApiReady'));
    iframeApiReady = true;
  };
</script>

<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  export let videoId: string;
  let player: YT.Player;

  const dispatch = createEventDispatcher<{
    ready: YT.PlayerEvent;
    error: YT.OnErrorEvent;
    stateChange: YT.OnStateChangeEvent;
    playbackRateChange: YT.OnPlaybackRateChangeEvent;
    playbackQualityChange: YT.OnPlaybackQualityChangeEvent;
  }>();

  onMount(() =>
    iframeApiReady ? initPlayer() : window.addEventListener('iframeApiReady', initPlayer)
  );

  function initPlayer() {
    player = new YT.Player('player', {
      videoId,
      playerVars: {
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: (e) => dispatch('ready', e),
        onError: (e) => dispatch('error', e),
        onStateChange: (e) => dispatch('stateChange', e),
        onPlaybackRateChange: (e) => dispatch('playbackRateChange', e),
        onPlaybackQualityChange: (e) => dispatch('playbackQualityChange', e),
      },
    });
  }

  onDestroy(() => player.destroy());
</script>

<div class="responsive">
  <div id="player" />
</div>
{#if player}
  <slot {player} />
{/if}

<style>
  .responsive {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }

  :global(.responsive iframe, .responsive object, .responsive embed) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
