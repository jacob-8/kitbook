<script lang="ts">
  export let showWidth: 'sm' | 'md' | 'lg' | 'xl';
  export let desktopClasses = '';
  export let mobileClasses = '';
</script>

<div
  class:sm:block={showWidth === 'sm'}
  class:md:block={showWidth === 'md'}
  class:lg:block={showWidth === 'lg'}
  class:xl:block={showWidth === 'xl'}
  class="hidden {desktopClasses}"
>
  <slot />
  <slot name="desktop" />
</div>

<div
  class:<sm:block={showWidth === 'sm'}
  class:<md:block={showWidth === 'md'}
  class:<lg:block={showWidth === 'lg'}
  class:<xl:block={showWidth === 'xl'}
  class="hidden {mobileClasses}"
>
  <slot />
  <slot name="mobile" />
</div>
