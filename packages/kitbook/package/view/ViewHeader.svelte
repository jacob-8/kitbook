<script>import { createEventDispatcher } from "svelte";
export let title;
export let description = void 0;
export let height = void 0;
export let width = void 0;
export let useIframe;
export let src;
const dispatch = createEventDispatcher();
function askPixels(dimension) {
  const pixels = prompt(`Specify ${dimension} in pixels:`);
  if (pixels)
    return +pixels;
}
</script>

<div class="kb-aui47c">
  {#if title}
    <div class="kb-6vocwd">
      {title}
    </div>
  {/if}
  <div class="kb-6obksc" />

  <button
    title="Specify Width"
    class="kb-4ghid7"
    on:click={() => (width = askPixels('width'))}
    ><span class="kb-uewqn0" /></button
  >
  <button
    title="Specify Height"
    class="kb-4ghid7"
    on:click={() => (height = askPixels('height'))}
    ><span class="kb-gw1oj3" /></button
  >

  <a href={src} title="Open Story by Itself" class="kb-4ghid7"
    ><span class="kb-57peni" /></a
  >

  {#if useIframe}
    <button
      title="Refresh Iframe"
      class="kb-4ghid7"
      on:click={() => dispatch('refresh')}><span class="kb-bd8yt8" /></button
    >
  {/if}
</div>

{#if description}
  <div class="kb-zeux56">{description}</div>
{/if}

<slot adjustedHeight={height} adjustedWidth={width} />

<style>:global(.kb-57peni){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5m-7 1L20 4m-5 0h5v5'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-bd8yt8){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 20q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q1.725 0 3.3.713q1.575.712 2.7 2.037V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2Q13.625 6 12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325Q14.75 20 12 20Z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-gw1oj3){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1024 1024' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 0 0-11.3 0L403.6 366.3a7.23 7.23 0 0 0 5.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-uewqn0){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1024 1024' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M180 176h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zm724 0h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zM785.3 504.3L657.7 403.6a7.23 7.23 0 0 0-11.7 5.7V476H378v-62.8c0-6-7-9.4-11.7-5.7L238.7 508.3a7.14 7.14 0 0 0 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h268v62.8c0 6 7 9.4 11.7 5.7l127.5-100.8c3.8-2.9 3.8-8.5.2-11.4z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-6obksc){margin-left:auto;}:global(.kb-aui47c){display:flex;align-items:center;}:global(.kb-4ghid7){padding:0.25rem;opacity:0.5;}:global(.kb-6vocwd){padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;font-weight:600;}:global(.kb-zeux56){padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;}:global(.kb-4ghid7:hover){opacity:1;}</style>