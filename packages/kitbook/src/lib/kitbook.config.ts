import { defineConfig } from "kitbook/defineConfig";

export default defineConfig({
  title: 'Kitbook',
  description: 'Svelte Component Documentation and Prototyping Workbench built using SvelteKit',
  viewports: [
    {
      name: 'Mobile',
      width: 320,
      height: 568,
    },
    {
      name: 'Desktop',
      width: 1024,
      height: 768,
    },
    {
      name: 'Tablet',
      width: 768,
      height: 1024,
    },
  ],
  // languages: [
  //   {
  //     name: 'English',
  //     code: 'en',
  //   },
  //   {
  //     name: 'Spanish',
  //     code: 'es',
  //   },
  // ],
  githubURL: 'https://github.com/jacob-8/kitbook/tree/main/packages/kitbook',
  expandTree: true,
  isKitbookItself: true,
});
