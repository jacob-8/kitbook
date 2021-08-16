<script context="module">
  // Useful Svelte example https://github.com/PandaWhisperer/svelte-youtube/blob/master/src/index.svelte
  // not using VimeJS nor https://github.com/gajus/youtube-player
  let tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let iframeApiReady = false;
  // @ts-ignore
  window.onYouTubeIframeAPIReady = () => {
    window.dispatchEvent(new Event('iframeApiReady'));
    iframeApiReady = true;
  };
</script>

<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import Button from './Button.svelte';
  export let videoId: string;
  let player: YT.Player;

  onMount(() => {
    iframeApiReady ? initPlayer() : window.addEventListener('iframeApiReady', initPlayer);
  });

  function initPlayer() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId,
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady() {
    console.log('ready!');
    player.playVideo();
    // setInterval(() => {
    //   dispatch('currentPlayTime', player.getCurrentTime());
    //   console.log(player.getCurrentTime());
    // }, 1000);
  }

  const dispatch = createEventDispatcher();
  function onPlayerStateChange({ data }) {
    dispatch('PlayerStateChange', data);
    console.log(Object.keys(YT.PlayerState).find((key) => YT.PlayerState[key] === data));
    if (data == YT.PlayerState.PLAYING) {}
  }

  onDestroy(() => {
    player.destroy();
  });
</script>

<div id="player" />

<Button onclick={() => player.pauseVideo()}>Pause</Button>
<Button onclick={() => player.playVideo()}>Play</Button>
<Button onclick={() => player.stopVideo()}>Stop</Button>
<Button onclick={() => player.seekTo(100, true)}>100ss</Button>
<Button onclick={() => player.setPlaybackRate(.75)}>.75</Button>
<Button onclick={() => player.setPlaybackRate(1)}>1</Button>
