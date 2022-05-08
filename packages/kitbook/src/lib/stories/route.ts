import { createRouteStore } from 'svelte-store-router';

export const route = createRouteStore({
  // delay: 300,
  handleNavigation: false,
  queryClean: true,
  fragmentClean: true
})