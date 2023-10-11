<script lang="ts">
  export let firstname: string
  export let lastname: string
</script>

<div>Bam name: {firstname} {lastname}</div>
<slot />
<div>Bam!</div>
