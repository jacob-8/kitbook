# Why Kitbook?

While **[Svench](https://svench-docs.vercel.app/)**, **[Storybook](https://codingcat.dev/tutorial/integrating-storybook-with-sveltekit)**, and **[Vitebook](https://vitebook.dev/)** are each great tools, none work well for building a simple documentation and prototyping tool for [SvelteKit](https://kit.svelte.dev/) apps and component libraries. The reasons in brief:

- **[Svench](https://svench-docs.vercel.app/)** deserves much of the credit for how Kitbook's layout was built and is an amazing tool. Unfortunately, it often breaks on Windows, sometimes requiring the dev server to be started twice before success, and has other quirks that have left me without the ability to use my workbench. I attribute these problems simply due to the fact that 1.0 was built long before SvelteKit and while 2.0 will work great when it's polished, @rixo is waiting for SvelteKit to hit 1.0 before doing that as things are still in flux. *I can't wait for an undefined future date.*

- **[Storybook](https://codingcat.dev/tutorial/integrating-storybook-with-sveltekit)**, even though it works with Vite now for better speed, it is still **way** too large and slow. Plus it's very buggy with SvelteKit still from my experience.

- **[Vitebook](https://vitebook.dev/)** is the most visually appealing but doesn't work in Windows... While very extendable, I find it much better suited for documentation and not for prototyping as important prototyping features are either missing or too verbose to implement.

- Additionally, none have a good solution to how to mock/shim SvelteKit imports like `import { browser } from "$app/env";`?

## The Solution
- Since all the roadblocks I've run into with each of these tools come from trying to use a tool that is outside of the SvelteKit box and which looks inside (Svench and Vitebook often struggle with the differences in how Windows handles file paths because neither developer uses a PC), the only guaranteed solution for a tool which keeps up with the pre-1.0 changes is to **use SvelteKit itself**! I will never have to shim SvelteKit imports, nor will I have issues with the API changing before 1.0.