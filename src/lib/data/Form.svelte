<script lang="ts">
  export let onsubmit: (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) => any;
  let loading = false;
  async function submitWithLoading(event) {
    if (onsubmit) {
      loading = true;
      try {
        await onsubmit(event);
      } catch (err) {
        console.error(err);
        alert(err);
      }
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={submitWithLoading}>
  <slot {loading} />
</form>

<form on:submit={() => {}} />
