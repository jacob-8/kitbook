# Why not use an already existing alternative?

While a lot of great tools exist, they are buggy and/or do not work well for building a simple documentation and prototyping tool for [SvelteKit](https://kit.svelte.dev/) apps and component libraries. A brief list:

- **[Svench](https://svench-docs.vercel.app/)** deserves much of the credit for Kitbook's initial inspiration and is an amazing tool. Unfortunately, it often breaks on Windows, sometimes requiring the dev server to be started twice before success, and has other quirks that have left me without the ability to use my workbench. I attribute these problems simply due to the fact that 1.0 was built long before SvelteKit and while 2.0 will work great when it's polished, @rixo hasn't updated Svench to work with the current SvelteKit.

- **[Storybook](https://codingcat.dev/tutorial/integrating-storybook-with-sveltekit)** is very buggy with SvelteKit, even with the new 7.0 beta. Hopefully this is fixed soon, however Storybook still is not the tool I'm looking for. In short, too many features I don't need, not enough of the ones I do need, and too much boilerplate. [Histoire](https://histoire.dev/) is less bloated but in a similar boat. Both of them are very prototype focused and aren't so great for an easy to read documentation tool I'm looking for. (Histoire's documentation is cordoned off to a little box in the upper right that seems like an afterthought). A prototyping tool should also be a useful place for both developers and non-developers to read documentation, explore components and not get lost in the controls. If developers don't write documentation as they build components, chances are they never will, or they will be sorely out of date.

- **[Bookit](https://bookit.leveluptutorials.com/)** is going the right direction and is the only one listed here allowing SvelteKit imports and features, but it is very feature incomplete and is more of a prototyping tool than a documentation one.

- **[Vitebook](https://vitebook.dev/)** was visually appealing but was missing many important prototyping features and is now discontinued.

All of the above tools, especially Svench, have served as a source of inspiration and ideas for Kitbook. Additionally, the following could also be helpful sources of inspiration in the future:

- [KitDocs](https://kit-docs.svelteness.dev/) 
- [svelte-knobby](https://github.com/Rich-Harris/svelte-knobby)
- svelte-headlessui