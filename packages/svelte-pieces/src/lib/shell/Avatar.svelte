<script lang="ts">
  import type { IUser } from './user.interface';
  export let user: IUser;
</script>

{#if user.photoURL}
  <img alt={(user.displayName && user.displayName[0]) || user.email[0]} src={user.photoURL} />
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
    --at-apply: rounded-full;
  }
  div {
    --at-apply: flex items-center justify-center font-semibold bg-gray-100 hover:bg-gray-200 uppercase;
  }
</style>
