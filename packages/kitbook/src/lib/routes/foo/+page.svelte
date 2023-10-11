<script lang="ts">
  import Bam from './Bam.svelte'

  const numbers = [1, 2, 3]

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  const fail = (ms: number) => new Promise((resolve, reject) => setTimeout(reject, ms))
</script>

<main>
  {#each numbers as number}
    <div>{number}</div>
    <Bam name={number.toString()}>
      <div>Inside {number}</div>
    </Bam>
  {/each}
  <div>Hi</div>

  <div class="w-400px bg-gray-100 ml-10">
    <Bam name="individual">
      <div>Inside bam</div>
    </Bam>
  </div>

  <footer>
    {#await sleep(2000)}
      <div>Sleeping</div>
    {:then _}
      <div>Done sleeping</div>
    {:catch _}
      <div>Error</div>
    {/await}
  </footer>
  <footer>
    {#await fail(2000)}
      <div>Fail coming</div>
    {:then _}
      <div>Won't see</div>
    {:catch _}
      <div>Failed</div>
    {/await}
  </footer>
</main>
