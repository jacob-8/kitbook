<script lang="ts">
  import { Story } from 'kitbook';

  // function autofocus(node: HTMLInputElement) {
  function autofocus(node) {
    setTimeout(() => node.focus(), 15);
  }
</script>

# Autofocus

Too simple to need a component - just included to easily show how to do this.

<Story showCode>
  <input class="m-2 p-2" type="text" use:autofocus placeholder="Just start typing..." />
</Story>
