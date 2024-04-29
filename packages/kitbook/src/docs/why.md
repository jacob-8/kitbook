# Why not use an already existing alternative?

While a lot of great tools exist, they do not fit the niche of a simple but powerful documentation and prototyping tool for [SvelteKit](https://kit.svelte.dev/) apps and component libraries. A brief list:

- **[Svench](https://svench-docs.vercel.app/)** deserves much of the credit for Kitbook's initial inspiration and is an amazing tool (Thanks, @rixo!). Unfortunately, it often broke on Windows, sometimes requiring the dev server to be started twice before success, and has other quirks that have left me without the ability to use my workbench. I attribute these problems simply due to the fact that 1.0 was built long before SvelteKit and while 2.0 was looking promising development on the tool stopped and did not grow up with SvelteKit.

- **[Storybook](https://storybook.js.org/docs/get-started/sveltekit)** is the one we all learn from and want to use. However, it and [Histoire](https://histoire.dev/) are in a very similar boat for me. They both have a large set of useful features, but they are very generalized (and run in React/Vue accordingly) and thus carry many features I don't need and not enough of the ones I do need. The generalization leads to boilerplate. Furthermore, while the "book" in "Kitbook" very much borrows from Storybook, it's not trying to make a better Storybook. It's trying to make an amazing Svelte developer experience. To do this, I believe requires the following pieces:
  - Encourage [component driven design](https://www.componentdriven.org/) - this does not mean just use a JS framework with components, but rather have a way to visually build individual components and pages in easily mockable ways with visual feedback from every adjustment. Kitbook is working towards a very effortless visual testing workflow as well to make it easy to visually see at a glance all changes incurred by a PR. ***Storybook** gets the credit for this idea.*
  - Tightly integrated. There's a reason people love the **Svelte Inspector** and **Nuxt DevTools**. Both just run alongside your app and make it easy to edit components and see what is going on. Kitbook is going to grow a lot in this area. Custom tools will give us the ability to seemlessly move from app into documentation/prototyping and back.
  - Documentation is first class, not off in a corner like in Histoire. Kitbook should read and navigate as easy or easier than **Vitepress**. There's a reason everyone is using Vitepress recently - because it makes it wonderful to read and navigate documentation. Kitbook must excel in this regard and that's why Kitbook's docs themselves are just a Kitbook.

  So maybe that will help you understand what Kitbook is: a little bit of Svench, Storybook, Svelte Inspector, Nuxt DevTools, and Vitepress - built for SvelteKit.

- **Bookit** took a step the right direction with its tight SvelteKit integration but Scott stopped working on it.

- **Vitebook** was visually appealing but was missing many important prototyping features and was discontinued.

All of the above tools, especially Svench, have served as a source of inspiration and ideas for Kitbook.
