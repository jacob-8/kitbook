<script>
  import { clickOutside } from '$lib/actions/clickOutside';

  import ShowHide from '$lib/functions/ShowHide.svelte';
  import type { IUser } from '$lib/interfaces';
  import Button from '$lib/ui/Button.svelte';
  import Avatar from './Avatar.svelte';
  export let user: IUser = undefined;
</script>

<header>
  {#if $$slots.default}
    <Button form="text" href="/" class="!text-lg !font-semibold">H</Button>
    <div
      class="text-lg font-semibold p-3 whitespace-nowrap overflow-x-auto md:overflow-hidden md:overflow-ellipsis">
      <slot />
    </div>
  {:else if $$slots.left}
    <slot name="left" />
  {:else}
    <Button form="text" href="/" class="!text-lg !font-semibold">Sveed</Button>
  {/if}
  <div class="w-1 flex-grow" />
  <Button form="text" href="/">About</Button>
  <Button form="text" href="/">Contact</Button>
  {#if user}
    <ShowHide let:show let:toggle let:set>
      <div use:clickOutside on:clickOutside={() => set(false)}>
        <button class="px-3 py-1" type="button" on:click={toggle}>
          <Avatar {user} />
        </button>
        {#if show}
          <div class="fixed top-0 right-0">Menu</div>
        {/if}
      </div>
    </ShowHide>
  {:else}
    <ShowHide let:show let:toggle>
      <Button form="text" onclick={toggle}>
        <i class="far fa-sign-in" />
        <span class="ml-1 hidden sm:inline"> Log In </span>
      </Button>
      {#if show}
        {#await import('$lib/ui/Modal.svelte') then { default: Modal }}
          <Modal on:close={toggle}>
            <div slot="heading">Log In</div>
            Place component here
          </Modal>
        {/await}
      {/if}
    </ShowHide>
  {/if}
</header>

<style>
  header {
    @apply top-0 left-0 right-0 flex items-center bg-white h-[50px] z-[2];
    /* @apply fixed; */
  }
</style>
