<script lang="ts">
  // started with https://svelte.dev/repl/c461dfe7dbf84998a03fdb30785c27f3?version=3.16.7 and also pulled a few ideas from https://github.com/metonym/svelte-intersection-observer
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  /**
   * The HTML Element to observe, a wrapper div will be used if no element is passed in
   */
  export let element: HTMLElement = undefined;
  let container: HTMLDivElement;

  /**
   * Set to `true` to unobserve the element after it intersects the viewport.
   */
  export let once = false;
  export let intervalMs: number = undefined;
  export let top = 0;
  export let bottom = 0;
  export let left = 0;
  export let right = 0;

  /**
   * Percentage of element visibility to trigger an event.
   * Value must be between 0 and 1.
   */
  export let threshold = 0;
  export let width = 'unset';
  export let height = 'unset';

  let intersecting = false;
  let interval;

  onMount(() => {
    const el = element || container;

    if (typeof IntersectionObserver !== 'undefined') {
      const rootMargin = `${top}px ${right}px ${bottom}px ${left}px`;

      const observer = new IntersectionObserver(
        (entries) => {
          intersecting = entries[0].isIntersecting;
          if (intersecting && once) {
            observer.unobserve(el); // is observer.disconnect() better?
          }
        },
        {
          rootMargin,
          threshold,
        }
      );

      observer.observe(el);
      return () => observer.unobserve(el);
    }

    function handler() {
      const bcr = el.getBoundingClientRect();
      intersecting =
        bcr.bottom + bottom > 0 &&
        bcr.right + right > 0 &&
        bcr.top - top < window.innerHeight &&
        bcr.left - left < window.innerWidth;

      if (intersecting && once) {
        window.removeEventListener('scroll', handler);
      }
    }

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  });

  const dispatch = createEventDispatcher<{ intersected: null; hidden: null }>();
  $: if (intersecting === true) {
    dispatch('intersected');
    if (intervalMs) {
      interval = setInterval(() => {
        if (intersecting === true) {
          dispatch('intersected');
        }
      }, intervalMs);
    }
  } else {
    dispatch('hidden');
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

{#if element}
  <slot {intersecting} />
{:else}
  <div style="width: {width}; height: {height};" bind:this={container}>
    <slot {intersecting} />
  </div>
{/if}
