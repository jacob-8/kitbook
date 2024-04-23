import { svelte2tsx } from 'svelte2tsx'

// import { SvelteComponentTyped } from 'svelte'
// import type { ComponentProps, SvelteComponent } from 'svelte'

// continue learning from https://github.com/sveltejs/language-tools/blob/master/packages/svelte2tsx/src/emitDts.ts
// will probably need to approach like https://github.com/fwouts/previewjs/blob/main/framework-plugins/svelte/src/svelte-reader.ts, and use https://www.typescriptlang.org/dev/typescript-vfs/
// see also https://github.com/damianof/large-scale-apps-my-svelte-project/blob/main/my-component-library/svelte2tsx.index.js

function getComponentPropsType(component: string) {
  const tsCodeForTypes = svelte2tsx(component, { filename: 'KitbookComponent', isTsFile: true, mode: 'dts' })
  return tsCodeForTypes
}

if (import.meta.vitest) {
  describe(getComponentPropsType, () => {
    test('simple', () => {
      const component = `<script>
export let world = 'name';
</script>

<h1>hello {world}</h1>`
      expect(getComponentPropsType(component).code).toMatchInlineSnapshot(`
        "import { SvelteComponentTyped } from "svelte"

        ;function render() {

         let world = 'name';
        ;
        async () => {

         { svelteHTML.createElement("h1", {}); world; }};
        return { props: {world: world} as {world?: typeof world}, slots: {}, events: {} }}
        const __propDef = __sveltets_2_with_any_event(render());
        export type KitbookComponentProps = typeof __propDef.props;
        export type KitbookComponentEvents = typeof __propDef.events;
        export type KitbookComponentSlots = typeof __propDef.slots;

        export default class KitbookComponent extends SvelteComponentTyped<KitbookComponentProps, KitbookComponentEvents, KitbookComponentSlots> {
        }"
      `)
    })
  })
}
