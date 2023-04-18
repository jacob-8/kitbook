import type { Variants } from 'kitbook';
import type Component from './Avatar.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'image',
    props: {
      user: {
        displayName: 'John Smith',
        email: 'b@gc.com',
        photoURL:
          'https://lh5.googleusercontent.com/-qCXZXfIkRQ8/AAAAAAAAAAI/AAAAAAAAACc/wAdH8yns3QQ/photo.jpg',
      }
    },
  },
  {
    name: 'broken image',
    props: {
      user: {
        displayName: 'John Smith',
        email: 'b@gc.com',
        photoURL:
          'https://broken-link.broken.jpg',
      }
    },
  },
  {
    name: 'full name',
    props: {
      user: {
        displayName: 'John Smith', email: 'b@gc.com',
      }
    },
  },
  {
    name: 'single name',
    props: {
      user: {
        displayName: 'John', email: 'b@gc.com',
      }
    },
  },
  {
    name: 'No display name, use email',
    props: {
      user: {
        // email: 'b@gc.com',
      }
    },
  },
]
