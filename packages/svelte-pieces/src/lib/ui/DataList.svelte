<script lang="ts">
  import { randomId } from '../utils/randomId';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    selected: { value: string; display: string; custom?: boolean };
  }>();

  export let id = randomId();
  export let allowAny = false;
  export let resetOnSelect = false;
  export let type:
    | 'text'
    | 'email'
    | 'url'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'search'
    | 'tel'
    | 'time'
    | 'week' = 'text';

  let inputEl: HTMLInputElement;

  function handleInput(
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    const el = e.currentTarget;
    if (!el.value) return;

    // @ts-ignore
    const options = el.list.options as HTMLOptionElement[];

    // look for exact match
    for (const option of options) {
      if (el.value === option.value) {
        dispatch('selected', { value: option.dataset.value, display: option.value });
        if (resetOnSelect) reset();
        return;
      }
    }

    // look for first partial match
    for (const option of options) {
      if (option.value.toLowerCase().includes(el.value.toLowerCase())) {
        el.value = option.innerText;
        dispatch('selected', { value: option.dataset.value, display: option.value });
        if (resetOnSelect) reset();
        return;
      }
    }

    // no match found
    if (allowAny) {
      dispatch('selected', { value: el.value, display: el.value, custom: true });
      if (resetOnSelect) reset();
    } else {
      el.value = '';
    }
  }

  function reset() {
    inputEl.value = '';
    inputEl.blur();
  }
</script>

<input bind:this={inputEl} {type} list={id} class={$$props.class} on:change={handleInput} />
<datalist {id}>
  <slot />
</datalist>
