<script >import { clickoutside } from '../actions/clickoutside';
import ShowHide from '../functions/ShowHide.svelte';
import Button from '../ui/Button.svelte';
import Avatar from './Avatar.svelte';
import Menu from './Menu.svelte';
export let user = undefined;
</script>

<header>
  {#if $$slots.default}
    <Button form="text" href="/" class="!text-lg !font-semibold">H</Button>
    <div class="text-lg font-semibold p-3 overflow-x-auto md:overflow-hidden md:overflow-ellipsis">
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
      <div class="relative" use:clickoutside on:clickoutside={() => set(false)}>
        <button class="px-3 py-1" type="button" on:click={toggle}>
          <Avatar {user} />
        </button>
        {#if show}
          <Menu>
            <div class="px-4 py-2 text-xs font-semibold text-gray-600">{user.displayName}</div>
            <div class="px-4 py-2 -mt-3 text-xs text-gray-600 border-b">{user.email}</div>
            <a href="/admin">
              Admin Panel
              <i class="fas fa-key" />
            </a>
            <a href="/account"> Settings </a>
            <button> Log out </button>
          </Menu>
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
        {#await import('../ui/Modal.svelte') then { default: Modal }}
          <Modal on:close={toggle}>
            <div slot="heading">Log In</div>
            Place component here
          </Modal>
        {/await}
      {/if}
    </ShowHide>
  {/if}
</header>

<style windi:inject>
header {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 50px;
  top: 0px;
  left: 0px;
  right: 0px;
  white-space: nowrap;
  z-index: 2;
}

.border-b {
  border-bottom-width: 1px;
}
.hidden {
  display: none;
}
.flex-grow {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}
.\!font-semibold {
  font-weight: 600 !important;
}
.font-semibold {
  font-weight: 600;
}
.\!text-lg {
  font-size: 1.125rem !important;
  line-height: 1.75rem !important;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.-mt-3 {
  margin-top: -0.75rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
.overflow-x-auto {
  overflow-x: auto;
}
.p-3 {
  padding: 0.75rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.relative {
  position: relative;
}
.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
}
.w-1 {
  width: 0.25rem;
}
@media (min-width: 640px) {
  .sm\:inline {
    display: inline;
  }
}
@media (min-width: 768px) {
  .md\:overflow-hidden {
    overflow: hidden;
  }
  .md\:overflow-ellipsis {
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
}
</style>
