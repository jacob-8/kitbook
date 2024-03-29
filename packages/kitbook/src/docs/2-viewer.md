# Viewer

In dev mode you'll see a cross-hairs button in the lower right corner. This is Kitbook's Viewer that allows you to:
- easily select components on the page
- view current component props
- view component variants 
- easily create a new variants file for a component if you don't have one yet
- and much more planned.

With Kitbook added to your app and your dev server running, try activating the Viewer by clicking the button and selecting one of your components that you'd like to create variants for. Click the `Add Variant from Current State` button (this will be more interesting if you choose a component with props) and you should find yourself in VSCode with a new file. If you selected a component named `Button.svelte` for example, you'll now see yourself looking at a file named `Button.variants.ts`. You'll notice it's an array of variants, and you have been given one to start, using the current props of the component you just clicked on. Now you probably want to continue on to learn more about [[3-component-variants]].


[//begin]: # "Autogenerated link references for markdown compatibility"
[3-component-variants]: 3-component-variants.md "Component Variants"
[//end]: # "Autogenerated link references"