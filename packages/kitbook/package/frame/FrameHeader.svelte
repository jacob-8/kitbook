<script>export let title;
export let description = void 0;
export let height = void 0;
export let width = void 0;
</script>

<div class="kb-vte8co">
  <div class="kb-7sztox">
    {#if title}
      <div class="kb-ggjw57">
        {title}
      </div>
    {/if}
    <div class="kb-3euzxq" />

    <!-- i-tabler-code"-->
    <!-- <button
      title="toggle width"
      class="kb-dalgxt"
      on:click={() => (width ? (width = undefined) : (width = 300))}
      ><span class="kb-5p0tla" /></button
    >
    <button
      title="toggle height"
      class="kb-dalgxt"
      on:click={() => (height ? (height = undefined) : (height = 200))}
      ><span class="kb-zd17k5" /></button
    > -->
  </div>

  {#if description}
    <div class="kb-oerb6n">{description}</div>
  {/if}

  <div class="kb-v8b12a" />

  <slot adjustedHeight={height} adjustedWidth={width} />
</div>

<style>:global(.kb-5p0tla){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1024 1024' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M180 176h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zm724 0h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zM785.3 504.3L657.7 403.6a7.23 7.23 0 0 0-11.7 5.7V476H378v-62.8c0-6-7-9.4-11.7-5.7L238.7 508.3a7.14 7.14 0 0 0 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h268v62.8c0 6 7 9.4 11.7 5.7l127.5-100.8c3.8-2.9 3.8-8.5.2-11.4z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-zd17k5){--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1024 1024' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 0 0-11.3 0L403.6 366.3a7.23 7.23 0 0 0 5.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z'/%3E%3C/svg%3E");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}:global(.kb-3euzxq){margin-left:auto;}:global(.kb-7sztox){display:flex;align-items:center;padding-left:0.5rem;padding-right:0.5rem;}:global(.kb-vte8co){overflow:hidden;border-width:1px;border-radius:0.25rem;--un-bg-opacity:1;background-color:rgba(249,250,251,var(--un-bg-opacity));}:global(.kb-v8b12a){border-bottom-width:1px;}:global(.kb-dalgxt){padding:0.25rem;opacity:0.5;}:global(.kb-ggjw57){padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;font-weight:600;}:global(.kb-oerb6n){padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;}:global(.kb-dalgxt:hover){opacity:1;}</style>