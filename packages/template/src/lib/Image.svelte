<script lang="ts">
  export let seed = ''
  export let width = 100
  export let height = 100

  $: src = seed ? `https://picsum.photos/seed/${seed}/${width * 3}/${height * 3}` : `https://picsum.photos/${width * 3}/${height * 3}`
</script>

<img style="width: {width}px; height: {height}px;" {src}>

<style>
  img {
    object-fit: cover;
    object-position: center;
  }
</style>
