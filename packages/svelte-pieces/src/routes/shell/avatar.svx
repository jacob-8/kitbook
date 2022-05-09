<script>
  import { Story } from 'kitbook';
  import Avatar from '$lib/shell/Avatar.svelte';
</script>

<Story name="image">
  <Avatar
    user={{
      displayName: 'John Smith',
      email: 'b@gc.com',
      photoURL:
        'https://lh5.googleusercontent.com/-qCXZXfIkRQ8/AAAAAAAAAAI/AAAAAAAAACc/wAdH8yns3QQ/photo.jpg',
    }} />
</Story>

<Story name="broken image">
  <Avatar
    user={{
      displayName: 'John Smith',
      email: 'b@gc.com',
      photoURL:
        'https://broken-link.broken.jpg',
    }} />
</Story>

<Story name="full name">
  <Avatar user={{ displayName: 'John Smith', email: 'b@gc.com', }} />
</Story>

<Story name="single name">
  <Avatar user={{ displayName: 'John', email: 'b@gc.com', }} />
</Story>

<Story name="No display name, use email">
  <Avatar user={{ email: 'b@gc.com', displayName: null }} />
</Story>
