<script>
  import { onMount } from 'svelte';

  export let string: string;
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

  function removeProtocol(s: string) {
    return s.replace(/\https?:\/\//, '');
  }
  function prepareUrl(s: string) {
    return s.replace(/\^www\./, 'http://');
  }

  function prepareResult(value: string) {
    console.log({value})
    if (urlRegex.test(value)) {
      console.log({value}, 'made it')
      return { display: removeProtocol(value), url: prepareUrl(value) };
    } else {
      return { display: value, url: null };
    }
  }

  let result = { display: '', url: null };
  onMount(() => (result = prepareResult(string)));
</script>

<slot {result} />
