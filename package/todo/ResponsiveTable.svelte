<div class="responsive-wrapper {$$props.class}">
  <table class="responsive-table">
    <slot />
  </table>
</div>

<style windi:inject>
.responsive-wrapper {
  border-radius: 0.25rem;
  border-width: 1px;
  overflow-x: auto;
  width: 100%;
}
.responsive-table {
  width: 100%;
}
:global(.responsive-table th) {
  text-align: start;
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  border-bottom-width: 2px;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  text-align: left;
  --tw-text-opacity: 1;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
:global(.responsive-table tr):hover {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}
:global(.responsive-table tr):focus-within {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}
:global(.responsive-table td) {
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  border-bottom-width: 1px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

</style>
