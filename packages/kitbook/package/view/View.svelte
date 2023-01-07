<script>import ViewHeader from "./ViewHeader.svelte";
import ViewBody from "./ViewBody.svelte";
import Iframe from "./Iframe.svelte";
import { IntersectionObserver } from "svelte-pieces";
import { page } from "$app/stores";
import LZString from "lz-string";
const { compressToEncodedURIComponent: encode } = LZString;
const DEFAULT_PIXEL_HEIGHT = 220;
export let title;
export let description = void 0;
export let width;
export let height = DEFAULT_PIXEL_HEIGHT;
export let useIframe = true;
export let hovered = false;
export let props = void 0;
export let queryParams;
let iframe;
$:
  encodedProps = props ? `props=${encode(JSON.stringify(props))}&` : "";
$:
  src = `/sandbox${$page.url.pathname}?${encodedProps}${queryParams}`;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<IntersectionObserver let:intersecting once>
  <div
    class="kb-7v4u9c not-prose"
    on:mouseover={() => (hovered = true)}
    on:mouseout={() => (hovered = false)}
  >
    <ViewHeader
      {title}
      {description}
      {width}
      {height}
      {src}
      {useIframe}
      let:adjustedHeight
      let:adjustedWidth
      on:refresh={() => {
        iframe.reload();
      }}
    >
      <ViewBody {hovered} height={adjustedHeight} width={adjustedWidth}>
        {#if useIframe}
          {#if intersecting}
            <Iframe bind:this={iframe} {src} />
          {/if}
        {:else}
          <slot />
        {/if}
      </ViewBody>
    </ViewHeader>
  </div>
</IntersectionObserver>

<style>:global(.kb-7v4u9c){margin-bottom:1rem;}</style>