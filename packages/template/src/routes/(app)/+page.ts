import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  return {
    name: 'Svelte Community',
    image_seeds: ['svelte-society'],
    save_to_db: (order_count: number) => alert(`This is pretending to be a real db, and it saved ${order_count} orders.`),
  }
}
