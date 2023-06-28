<script lang="ts" context="module">
  let observer: IntersectionObserver;

  // As each element registers with the observer, map Elements to Callbacks so when an element's intersection changes its callback is invoked
  const mapping = new Map();

  function add(element: HTMLElement, callback: (isIntersecting: boolean) => void) {
    mapping.set(element, callback);
    observer.observe(element);
  }

  function remove(element: HTMLElement) {
    const deleted = mapping.delete(element);
    deleted && observer.unobserve(element);
  }
</script>

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

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

  let intersecting = false;
  let container: HTMLDivElement;
  let childElement: HTMLElement;
  let interval;

  onMount(() => {
    childElement = container.firstElementChild as HTMLElement;
    if (!childElement) {
      return console.error('IntersectionObserver: No child element found')
    }

    if (typeof IntersectionObserver !== 'undefined') {
      if (!observer) {
        const rootMargin = `${top}px ${right}px ${bottom}px ${left}px`;
        console.log({rootMargin})

        observer = new IntersectionObserver(
          (entries) => {
            for (var entry of entries) {
              const callback = mapping.get(entry.target);
              callback && callback(entry.isIntersecting);
            }
          },
          {
            rootMargin,
            threshold,
          }
        );
      }

      add(childElement, (isIntersecting: boolean) => {
        intersecting = isIntersecting;
      });

      return () => remove(container);
    }

    function handler() {
      const bcr = childElement.getBoundingClientRect();
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
    once && remove(container);
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

<div style="display: contents" bind:this={container}>
  <slot {intersecting} />
</div>

<!-- Tips from:
https://svelte.dev/repl/c461dfe7dbf84998a03fdb30785c27f3?version=3.16.7
https://github.com/metonym/svelte-intersection-observer
https://www.bennadel.com/blog/3954-intersectionobserver-api-performance-many-vs-shared-in-angular-11-0-5.htm -->