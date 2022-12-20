<script lang="ts">
  import { Story } from 'kitbook';
  import Button from '$lib/ui/Button.svelte';
  import Modal from '$lib/ui/Modal.svelte';
  import ShowHide from '$lib/functions/ShowHide.svelte';
</script>

<Story name="Relies on ShowHide">
  <ShowHide let:show let:toggle>
    <Button onclick={toggle}>Open modal</Button>
    {#if show}
      <Modal on:close={toggle}>
        <div slot="heading">Heading</div>
        <form
          on:submit|preventDefault={(e) => {
            console.log('submitted', e);
            toggle();
          }}>
          Body content
          <div class="modal-footer">
            <Button form="simple" onclick={toggle}>Close</Button>
            <Button form="filled" type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    {/if}
  </ShowHide>
</Story>