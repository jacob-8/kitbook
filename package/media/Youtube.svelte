<script context="module" >export const PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
};
let iframeApiReady = false;
if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
    //@ts-ignore
    window.onYouTubeIframeAPIReady = () => {
        window.dispatchEvent(new Event('iframeApiReady'));
        iframeApiReady = true;
    };
}
</script>

<script >import { createEventDispatcher, onDestroy, onMount } from 'svelte';
export let videoId;
let player;
const dispatch = createEventDispatcher();
onMount(() => iframeApiReady ? initPlayer() : window.addEventListener('iframeApiReady', initPlayer));
function initPlayer() {
    player = new YT.Player('player', {
        videoId,
        playerVars: {
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
        },
        events: {
            onReady: (e) => {
                state = e.target.getPlayerState();
                playbackRate = e.target.getPlaybackRate();
                playbackQuality = e.target.getPlaybackQuality();
                readyPlayer = e.target;
                dispatch('ready', e.target);
            },
            onError: (e) => {
                error = e.data;
                errorExplanation = Object.keys(YT.PlayerError).find((key) => YT.PlayerError[key] === error);
                dispatch('error', e);
            },
            onStateChange: (e) => {
                state = e.data;
                dispatch('stateChange', e);
            },
            onPlaybackRateChange: (e) => {
                playbackRate = e.data;
                dispatch('playbackRateChange', e);
            },
            onPlaybackQualityChange: (e) => {
                playbackQuality = e.data;
                dispatch('playbackQualityChange', e);
            },
        },
    });
}
let error;
let errorExplanation;
let state;
let playbackRate;
let playbackQuality;
let readyPlayer;
onDestroy(() => player && player.destroy());
</script>

<div class="responsive">
  {#if !error}
    <div id="player" />
  {:else}
    <div style="text-align: center; margin-top: 20px;">
      Playback Error {error}: {errorExplanation}
    </div>
  {/if}
</div>

{#if readyPlayer}
  <slot {player} {state} {playbackRate} {playbackQuality} />
{/if}

<style windi:inject>
.responsive {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
:global(.responsive iframe), :global(.responsive object), :global(.responsive embed) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
