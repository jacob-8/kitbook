<script>
  import type { IUser } from '$lib/interfaces';
  export let user: IUser;
</script>

{#if user.photoURL}
  <img alt={user.displayName[0]} src={user.photoURL} />
{:else}
  <div>
    {#if user.displayName}
      {user.displayName[0]}{user.displayName.split(' ')[1] ? user.displayName.split(' ')[1][0] : ''}
    {:else}
      {user.email[0]}
    {/if}
  </div>
{/if}

<style>
  img,
  div {
    width: 34px;
    height: 34px;
    @apply rounded-full;
  }
  div {
    @apply flex items-center justify-center font-semibold bg-gray-100 hover:bg-gray-200 uppercase;
  }
</style>
