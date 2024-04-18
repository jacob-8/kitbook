# Kitbook: Easily Build, Document, Inspect, & Test Svelte Components

> Description
> Kitbook picks up where Svench left off. It allows you to easily document components in markdown and develop them in isolation using iframes. It will include the relevant context from your main app needed to make components work (styles, i18n, SvelteKit imports) but not anything further that you don't want, like database connections. Adds a Viewer to your main app to select a component (similar to the Svelte Inspector) and instantly create typesafe component variants from the current props state of that component. Then just add a few more variants, then edit the component and watch your changes update simultaneously across all variants, chosen viewport sizes (and languages if desired). Kitbook also provides easy visual summary reports in your PRs of exactly which components changed and how making team communication and review effortless, in addition to catching regression bugs.

## About Me

[me] Hey Svelte Community, I'm Jacob and I work on various language tools (for human languages). Today I want to share my Kitbook with you [Kitbook]. It makes it simple to build, document, inspect and test user interfaces [resizing the variant of the view].

## Why

Let's start with an example of a view [entry page] I have that demonstrates why a visual mocking tool is needed. Living Dictionaries is platform for small language communities to build their own dictionary for the first time. We have a dictionary entry page with many different possible states. [flip through various entry pages] We need to be able to easily mock state and test interactions but as the app grows, the complexity explodes out of control. Let's walk through some of the possible permutations of what this page could look like [change variant code on left and view on right for each]:

- There are four levels of user access: Visitor, Contributor, Editor, Admin. 
- The main word/phrase could be written in multiple writing systems.
- There are often multiple glossing languages, some with special keyboards
- There are __15?__ different possible main fields
- could have multiple senses
- 14 different languages, 2 of which are right to left
- Multiple different types of media [dropping an image]
- And then you have the platforms: desktop, mobile, client-rendered, server-rendered

...you get the point. [show logged in and out] You also have views that you want to be able to build, edit, and test in an easy fashion without having to change user accounts, change languages [show poly-i18n], make database edits, or find just the right page. You need a tool to build components in isolation, where it's easy to mock state. After many attempts to unsuccessfully get into good workflows with other prototyping tools, I finally found a solution in Svench. It was amazing, thank you Rixo, but it never grew up with SvelteKit. As the Svelte ecosystem moved forward and left Svench behind, I realized I needed to take what I learned from Svench and build something 100% compatible w/ SvelteKit. So I built Kitbook with the purpose of making it as easy as possible to build Svelte components in the context of SvelteKit applications.

## What

At the core of Kitbook is the Variant. Basically what users of Storybook would think of as a Story. The base api is simple. Just export a named object from a sibling *.variants.ts file with the needed props for mounting the component in isolation. This covers a large amount of use cases. You can also set context, and adjust various viewport, platform, and language settings.

Sometimes you need some slot content or rather you'd like to create a composition of components working in tandem. This is Kitbook's second core feature, the Composition, which is a sibling *.composition file.

Kitbook also makes it easy to write documentation while you build components. This is written in companion markdown files, and compositions can also be easily be included into the middle of the markdown. I used to use MDSvex for this, but soon found that on the scale at which I would be writing both prose and components it was no good to have to choose between having the markdown or the Svelte language server active, formatters also struggle. So I keep them separate now, but the Foam extension for VS Code makes it easy to place compositions inside the markdown.

When using Kitbook to build a component library that has lots of documentation, like Kitbook itself for example or my svelte-pieces library, the use of the Foam extension makes it effortless to wiki-link between pages and ensure these wiki-links never get broken. These links auto-populate, auto-update via the janitor command, work in VS Code, GitHub, and of course in Kitbook. You can also alias them.

I told you I work on language tools, and I'm learning Mandarin right now, so i18n support is a first class citizen, with the language code being passed via url.

Variants and Components are SSR'd by default and then client-rendered. But that happens fast so you can force it to stay in the server-rendered state if needed. Or perhaps you're doing something like rendering html from a component for an open graph image generator or to send an email, and you always want it to be SSR-only. You can do that too, and it comes with live-reload for free (not HMR, but next best thing). On the flip-side you may have components that work in the browser only, and you can do that too to avoid getting a server error.

Kitbook supports virtually free and unlimited visual regression testing via GitHub actions and a Google Cloud storage bucket solution. It's cool and even though you can shard Playwright screenshot runners across many instances if desired, I personally feel that in a large project with a large number of language, it's a little bit slow for Playwright to take all the screenshots, so I actually have a better idea in mind for how to do this in the future. I'd like to utilize HTML comparison and not pixel comparison to check for differences between main and a branch, and then only visually render components when I'm reviewing as a human. That'll be much faster (difference between Playwright E2E and Vitest unit tests), and I'll move all my projects to that method, but of course the current screenshot method would still work in the future though I think it's not as compelling. 99% of my visual checking needs are not related to some change the browsers made, but rather for team communication and bug checking to ensure changes we incurred ourselves in the HTML code are what we want. So this current PR report about changes, is planned in the future to just be a few stats about what changed, along with a link to a specific page in that deployed Kitbook which will display all changed instance in one page for easy review.

(on screen, show a note that there's support for Playwright component testing here too)

## How

To get started, you can just add the Vite plugin and start your dev server. You'll notice a new link to a new folder that was added to your routes folder. We can open that to go straight to the homepage. From here, we could search for a component, add some documentation, and add one composition to demonstrate.

[entry list page, solve width on media and demo dropping an image]
Let's make some variants now. Kitbook works as part of your main app, much like Nuxt Devtools, so it's easy move from working directly in the app to working in the Kitbook. From this page, I'm going to select a component to see it in the Kitbook Viewer with the same props and then can just create a variant from that state. Now let's add another variant from this state. Now let's jump into the Kitbook in another tab, add some documentation, and yet another variant. I can double check how it looks in different languages, and call it good. (I'm literally making a needed change right now.)

## How to learn more and what to expect

Read the docs all the way through, if you want to use Kitbook. I want you to know about all the useful options, but I especially want you to read the roadmap so you can be aware of the ugly parts. Though the core functionality is stable, Kitbook is not the prettiest yet, as well a lot of the convenience features, like quickly creating files, may have bugs. As you use it, consider cloning the repo next to your project folder and installing Kitbook like this so you can make improvements and contribute them back to the project. I would love your help, and the roadmap can give you ideas of PRs that would be very welcome.

One last thought. You may find it odd that it gets deployed with your main app. If this bothers you, you can create a PR to make an option in the config to skip on build. It would be a trivial adjustment to the Vite plugin. I need it built for my use cases, and it was breaking my automated tests based on Vercel deployment to have two separate deployments, so it's just one. I love having the tight integration so that there's no need duplicate setup of i18n, css, or mock various SvelteKit imports [Storybook support image]. At same time, I'm also very opinionated about the need to keep components backend agnostic. All data and possible database operations should be passed in via page/layout load functions. I love the current state the Kitbook is in. Coupled to things like i18n you don't want to setup twice. Decoupled from the backend. I have notes in the docs about how to structure your app to enforce this. So go read the docs, let me know what you think, and hey, have fun!