<script lang="ts">
  export let string: string;

  function prepareDisplay(s: string) {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    if (urlRegex.test(s)) {
      return s.replace(/https?:\/\//, '');
    } else {
      return s;
    }
  }

  function prepareHref(s: string) {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    if (urlRegex.test(s)) {
      return s.replace(/^www\./, 'http://');
    } else {
      return null;
    }
  }
</script>

<slot display={prepareDisplay(string)} href={prepareHref(string)} />
