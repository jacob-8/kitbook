<script >export let user;
</script>

{#if user.photoURL}
  <img alt={user.displayName && user.displayName[0] || user.email[0]} src={user.photoURL} />
{:else}
  <div>
    {#if user.displayName}
      {user.displayName[0]}{user.displayName.split(' ')[1] ? user.displayName.split(' ')[1][0] : ''}
    {:else}
      {user.email[0]}
    {/if}
  </div>
{/if}

<style windi:inject>
img, div {
  width: 34px;
  height: 34px;
  border-radius: 9999px;
}
div {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  font-weight: 600;
  text-transform: uppercase;
}
div:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}

</style>
