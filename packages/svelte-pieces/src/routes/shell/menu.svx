<script>
  import { Story } from 'kitbook';
  import Menu from '$lib/shell/Menu.svelte';
  import { portal } from '$lib/actions/portal';

</script>

<Story>
  <div class="relative bg-white p-3 w-full" style="height: 250px;">
    <Menu>
      <div class="px-4 py-2 text-xs font-semibold text-gray-600">John Smith</div>
      <div class="px-4 py-2 -mt-3 text-xs text-gray-600 border-b">j@jim.com</div>
      <a href="/admin">
        Admin Panel
        <span class="i-fa-solid-key" />
      </a>
      <a href="/account"> Settings </a>
      <button> Log out </button>
    </Menu>
  </div>
</Story>

<Story name="portaled to body">
  <div class="relative bg-white p-3 w-full" style="height: 250px;">
    <!-- <Menu class="ltr:right-2 rtl:left-2 top-11" /> -->
    <Menu {portal}>
      <div class="px-4 py-2 text-xs font-semibold text-gray-600">John Smith</div>
      <div class="px-4 py-2 -mt-3 text-xs text-gray-600 border-b">j@jim.com</div>
      <a href="/admin">
        Admin Panel
        <span class="i-fa-solid-key" />
      </a>
      <a href="/account"> Settings </a>
      <button> Log out </button>
    </Menu>
  </div>
</Story>

Use `use:portal` if needed to solve z-index issues.
