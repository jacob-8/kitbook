<script lang="ts">
  import type { IUser } from './user.interface';
  export let user: IUser;
  let broken_image = false;
</script>

{#if user.photoURL && !broken_image}
  <img
    class="w-34px h-34px rounded-full"
    alt={(user.displayName && user.displayName[0]) || user.email[0]}
    src={user.photoURL}
    on:error={() => broken_image = true}
  />
{:else}
  <div
    class="w-34px h-34px rounded-full flex items-center justify-center font-semibold bg-gray-100 hover:bg-gray-200 uppercase"
  >
    {#if user.displayName}
      {user.displayName[0]}{user.displayName.split(' ')[1] ? user.displayName.split(' ')[1][0] : ''}
    {:else if user.email}
      {user.email[0]}
    {:else}
      _
    {/if}
  </div>
{/if}
