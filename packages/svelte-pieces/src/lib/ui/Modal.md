<script lang="ts">
  import { Story } from 'kitbook';
  import Button from '$lib/ui/Button.svelte';
  import Modal from '$lib/ui/Modal.svelte';
  import ShowHide from '$lib/functions/ShowHide.svelte';
</script>

<Story name="Relies on ShowHide" height={300}>
  <ShowHide let:show let:toggle>
    <Button onclick={toggle}>Open modal</Button>
    <input placeholder="testing focus" />

    <!-- <div style="height: 500px;">I'm tall to test toggling of document scroll - doesn't work since iframe body height is set to 100%, could add flag to turn this off?</div> -->
    {#if show}
      <Modal on:close={toggle} noscroll>
        <div slot="heading">Heading</div>
        <form
          on:submit|preventDefault={(e) => {
            console.log('submitted', e);
            toggle();
          }}>
          Body content
          <button>Standard button</button>
          <button>Standard button</button>
          <div class="modal-footer">
            <Button form="simple" onclick={toggle}>Close</Button>
            <Button form="filled" type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    {/if}
  </ShowHide>
</Story>
