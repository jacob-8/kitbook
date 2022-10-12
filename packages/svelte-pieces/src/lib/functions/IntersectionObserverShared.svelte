<script lang="ts" context="module">
  // learned how to implement a single observer from https://www.bennadel.com/blog/3954-intersectionobserver-api-performance-many-vs-shared-in-angular-11-0-5.htm
  let observer: IntersectionObserver;

  // As each element registers with the observer, we map Elements to Callbacks so when an element's intersection changes can invoke its callback
  const mapping = new Map();

  function add(element: HTMLDivElement, callback: Function) {
    mapping.set(element, callback);
    observer.observe(element);
  }

  function remove(element: HTMLDivElement) {
    const deleted = mapping.delete(element);
    deleted && observer.unobserve(element);
  }

  // observer.disconnect() if no more instances?
</script>

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let once = false;
  export let intervalMs: number = undefined;
  export let top = 0;
  export let bottom = 0;
  export let left = 0;
  export let right = 0;
  export let threshold = 0;
  export let heightPercentage = 100;

  let intersecting = false;
  let container: HTMLDivElement;
  let interval;

  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      if (!observer) {
        const rootMargin = `${top}px ${right}px ${bottom}px ${left}px`;

        observer = new IntersectionObserver(
          (entries) => {
            for (var entry of entries) {
              console.log({ entry });
              const callback = mapping.get(entry.target);
              callback && callback(entry.isIntersecting);
              
              if (intersecting && once) {
                remove(container);
              }
            }
          },
          {
            rootMargin,
            threshold,
          }
        );
      }

      add(container, (isIntersecting: boolean) => {
        console.log({container});
        console.log({isIntersecting});
        intersecting = isIntersecting;
      });

      return () => remove(container);
    }

    function handler() {
      const bcr = container.getBoundingClientRect();
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

<div style="width: 100%; height: {heightPercentage}%;" bind:this={container}>
  <slot {intersecting} />
</div>
