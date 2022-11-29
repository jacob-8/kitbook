<script lang="ts">
  import { Layout } from '../../';
  import { PUBLIC_KITBOOK_TITLE, PUBLIC_GITHUB_URL } from '$env/static/public';
</script>

<Layout expanded title={PUBLIC_KITBOOK_TITLE} githubURL={PUBLIC_GITHUB_URL}>
  <slot />
</Layout>
