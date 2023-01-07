export const modules = import.meta.glob(['/src/**/*.{svelte,variants.ts}']);

console.log({ modules })