<script >import Button from '../ui/Button.svelte';
import ShowHide from '../functions/ShowHide.svelte';
export let obj;
$: json = JSON.stringify(obj, null, 2)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
    var color = 'darkorange'; // number'
    if (/^"/.test(match)) {
        if (/:$/.test(match)) {
            color = 'red'; // key
        }
        else {
            color = 'green'; // string
        }
    }
    else if (/true|false/.test(match)) {
        color = 'blue'; // boolean
    }
    else if (/null/.test(match)) {
        color = 'magenta'; // null
    }
    return '<span style="color:' + color + '">' + match + '</span>';
});
</script>

<ShowHide let:show let:toggle>
  <Button onclick={toggle} form="simple" color="black">
    <i class="fas fa-code" />
  </Button>
  {#if show}
    <div class="fullscreen">
      <button type="button" class="px-3 py-2 bg-gray-100 text-gray-700" on:click={toggle}
        >Hide</button>
      <pre style="white-space:pre-wrap; font-size: 12px;">
      {@html json}
    </pre>
    </div>
  {/if}
</ShowHide>

<style windi:inject>
.fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: white;
  z-index: 100;
  overflow-y: auto;
}

.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
</style>
