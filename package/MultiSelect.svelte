<script lang="javascript">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  export let value = [];
  export let readonly = false;
  export let placeholder = '';

  $: calculatedPlaceholder = value && value.length ? '' : placeholder;

  let input,
    inputValue,
    options = [],
    activeOption,
    showOptions = false,
    selected = {},
    first = true,
    slot;

  onMount(() => {
    slot.querySelectorAll('option').forEach((o) => {
      o.selected && o.value && !value.includes(o.value) && (value = [...value, o.value]);
      options = [...options, { value: o.value, name: o.textContent }];
    });
    value &&
      (selected = options.reduce(
        (obj, op) => (value.includes(op.value) ? { ...obj, [op.value]: op } : obj),
        {}
      ));
    first = false;
  });

  $: if (!first) value = Object.values(selected).map((o) => o.value);
  $: filtered = options.filter((o) =>
    inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o
  );
  $: if ((activeOption && !filtered.includes(activeOption)) || (!activeOption && inputValue))
    activeOption = filtered[0];

  function add(token) {
    inputValue = '';
    if (!readonly) selected[token.value] = token;
  }

  function remove(value) {
    if (!readonly) {
      const { [value]: val, ...rest } = selected;
      selected = rest;
    }
  }

  function optionsVisibility(show) {
    if (readonly) return;
    if (typeof show === 'boolean') {
      showOptions = show;
      show && input.focus();
    } else {
      showOptions = !showOptions;
    }
    if (!showOptions) {
      activeOption = undefined;
    }
  }

  function handleKeyup(e) {
    if (e.keyCode === 13) {
      Object.keys(selected).includes(activeOption.value)
        ? remove(activeOption.value)
        : add(activeOption);
      inputValue = '';
    }
    if ([38, 40].includes(e.keyCode)) {
      // up and down arrows
      const increment = e.keyCode === 38 ? -1 : 1;
      const calcIndex = filtered.indexOf(activeOption) + increment;
      activeOption =
        calcIndex < 0
          ? filtered[filtered.length - 1]
          : calcIndex === filtered.length
          ? filtered[0]
          : filtered[calcIndex];
    }
  }

  function handleBlur(e) {
    optionsVisibility(false);
  }

  function handleTokenClick(e) {
    if (e.target.closest('.token-remove')) {
      e.stopPropagation();
      remove(e.target.closest('.token').dataset.id);
    } else if (e.target.closest('.remove-all')) {
      selected = [];
      inputValue = '';
    } else {
      optionsVisibility(true);
    }
  }

  function handleOptionMousedown(e) {
    const value = e.target.dataset.value;
    if (selected[value]) {
      remove(value);
    } else {
      add(options.filter((o) => o.value === value)[0]);
      input.focus();
    }
  }
</script>

<div class="multiselect" class:readonly>
  <div class="tokens" class:showOptions on:click={handleTokenClick}>
    {#each Object.values(selected) as s}
      <div
        class="token items-center flex rounded-lg px-2 py-1 whitespace-nowrap
        text-sm font-medium leading-4 bg-blue-100 text-blue-800 mr-2 my-1"
        data-id={s.value}>
        <span>{s.name}</span>
        {#if !readonly}
          <div
            class="token-remove cursor-pointer justify-center items-center flex
            bg-blue-300 hover:bg-blue-400 rounded-full h-4 w-4 ml-1"
            title="Remove {s.name}">
            <i class="far fa-times fa-sm" />
          </div>
        {/if}
      </div>
    {/each}
    <div class="actions">
      {#if !readonly}
        <!-- class="appearance-none block w-full px-3 py-2 border border-gray-300
      rounded-md placeholder-gray-400 focus:outline-none
      focus:shadow-outline-blue focus:border-blue-300 transition
      duration-150 ease-in-out sm:text-sm sm:leading-5" -->
        <input
          class="border-none m-0 p-0 outline-none w-full"
          autocomplete="off"
          bind:value={inputValue}
          bind:this={input}
          on:keyup={handleKeyup}
          on:blur={handleBlur}
          placeholder={calculatedPlaceholder} />
        <!-- <div
          class="remove-all"
          title="Remove All"
          class:hidden={!Object.keys(selected).length}>
          <svg
            class="icon-clear"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24">
            <path d={iconClearPath} />
          </svg>
        </div> -->
        <svg
          class="dropdown-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18">
          <path d="M5 8l4 4 4-4z" />
        </svg>
      {/if}
    </div>
  </div>

  <select bind:this={slot} type="multiple" class="hidden">
    <slot />
  </select>

  {#if showOptions}
    <ul
      class="options"
      transition:fly={{ duration: 200, y: 5 }}
      on:mousedown|preventDefault={handleOptionMousedown}>
      {#each filtered as option}
        <li
          class:selected={selected[option.value]}
          class:active={activeOption === option}
          data-value={option.value}>
          {option.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .multiselect {
    background-color: white;
    border-bottom: 2px dashed #afafaf;
    position: relative;
    z-index: 1;
  }
  .multiselect:not(.readonly):hover {
    border-bottom-color: hsl(0, 0%, 50%);
  }

  .tokens {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  .tokens::after {
    background: none repeat scroll 0 0 transparent;
    bottom: -1px;
    content: '';
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: navy;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  .tokens.showOptions::after {
    width: 100%;
    left: 0;
  }

  .readonly .token {
    color: hsl(0, 0%, 40%);
  }

  .actions {
    align-items: center;
    display: flex;
    flex: 1;
    min-width: 3rem;
  }

  .dropdown-arrow path {
    fill: hsl(0, 0%, 70%);
  }
  .multiselect:hover .dropdown-arrow path {
    fill: hsl(0, 0%, 50%);
  }

  .options {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px -2px 4px rgba(0, 0, 0, 0.1);
    left: 0;
    list-style: none;
    margin-block-end: 0;
    margin-block-start: 0;
    max-height: 70vh;
    overflow: auto;
    padding-inline-start: 0;
    position: absolute;
    top: calc(100% + 1px);
    width: 100%;
  }
  li {
    background-color: white;
    cursor: pointer;
    padding: 0.5rem;
  }
  li:last-child {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
  li:not(.selected):hover {
    background-color: hsl(214, 17%, 92%);
  }
  li.selected {
    background-color: hsl(232, 54%, 41%);
    color: white;
  }
  li.selected:nth-child(even) {
    background-color: hsl(232, 50%, 45%);
    color: white;
  }
  li.active {
    background-color: hsl(214, 17%, 88%);
  }
  li.selected.active,
  li.selected:hover {
    background-color: hsl(232, 48%, 50%);
  }</style>
