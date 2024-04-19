import { connectParentsAndChildren } from './connectParentsAndChildren'

function createComponent({ tagName, parent }: { tagName: string; parent?: string }): [ComponentFragment, ComponentWithChildren] {
  return [
    tagName as any as ComponentFragment,
    {
      componentDetail: {
        tagName,
      },
      childComponents: new Set(),
      childElements: new Set(),
      parentComponent: parent as any as ComponentFragment,
    } as ComponentWithChildren,
  ]
}

function createElement({ tagName, file }: { tagName: string; file: string }): [SvelteElementDetail, ComponentFragment] {
  return [
    {
      __svelte_meta: {
        loc: {
          file,
        },
      },
    } as SvelteElementDetail,
    tagName as any as ComponentFragment,
  ]
}

describe(connectParentsAndChildren, () => {
  test('adds elements to first ancestor component that is not from node_modules', () => {
    const components: Map<ComponentFragment, ComponentWithChildren> = new Map([
      createComponent({ tagName: 'Header' }),
      createComponent({ tagName: 'Footer' }),
      createComponent({ tagName: 'Button', parent: 'Header' }),
      createComponent({ tagName: 'InsideButton', parent: 'Button' }),
      createComponent({ tagName: 'InsideInsideButton', parent: 'InsideButton' }),
    ])
    const elements: Map<SvelteElementDetail, ComponentFragment> = new Map([
      createElement({ tagName: 'Header', file: './Header.svelte' }),
      createElement({ tagName: 'Footer', file: './Footer.svelte' }),
      createElement({ tagName: 'Footer', file: './Footer.svelte' }),

      // element which is a component from node_modules but also has elements inside it from a local component
      createElement({ tagName: 'Button', file: 'foo/node_modules/svelte-pieces/Button.svelte' }),
      createElement({ tagName: 'Button', file: './from-button/Header.svelte' }),

      // elements of a component in node_modules whose parent component is also from node_modules
      createElement({ tagName: 'InsideButton', file: 'foo/node_modules/svelte-pieces/InsideButton.svelte' }),
      createElement({ tagName: 'InsideInsideButton', file: 'foo/node_modules/svelte-pieces/InsideInsideButton.svelte' }),
    ])
    expect(connectParentsAndChildren(components, elements)).toMatchInlineSnapshot(`
      Map {
        "Header" => {
          "childComponents": Set {
            "Button",
          },
          "childElements": Set {
            {
              "__svelte_meta": {
                "loc": {
                  "file": "./Header.svelte",
                },
              },
            },
            {
              "__svelte_meta": {
                "loc": {
                  "file": "./from-button/Header.svelte",
                },
              },
            },
            {
              "__svelte_meta": {
                "loc": {
                  "file": "foo/node_modules/svelte-pieces/Button.svelte",
                },
              },
            },
            {
              "__svelte_meta": {
                "loc": {
                  "file": "foo/node_modules/svelte-pieces/InsideButton.svelte",
                },
              },
            },
            {
              "__svelte_meta": {
                "loc": {
                  "file": "foo/node_modules/svelte-pieces/InsideInsideButton.svelte",
                },
              },
            },
          },
          "componentDetail": {
            "tagName": "Header",
          },
          "isFromNodeModules": false,
          "localFilenameUsedIn": "./Header.svelte",
          "parentComponent": undefined,
        },
        "Footer" => {
          "childComponents": Set {},
          "childElements": Set {
            {
              "__svelte_meta": {
                "loc": {
                  "file": "./Footer.svelte",
                },
              },
            },
            {
              "__svelte_meta": {
                "loc": {
                  "file": "./Footer.svelte",
                },
              },
            },
          },
          "componentDetail": {
            "tagName": "Footer",
          },
          "isFromNodeModules": false,
          "localFilenameUsedIn": "./Footer.svelte",
          "parentComponent": undefined,
        },
        "Button" => {
          "childComponents": Set {
            "InsideButton",
          },
          "childElements": Set {},
          "componentDetail": {
            "tagName": "Button",
          },
          "isFromNodeModules": true,
          "localFilenameUsedIn": "./from-button/Header.svelte",
          "parentComponent": "Header",
        },
        "InsideButton" => {
          "childComponents": Set {
            "InsideInsideButton",
          },
          "childElements": Set {},
          "componentDetail": {
            "tagName": "InsideButton",
          },
          "isFromNodeModules": true,
          "parentComponent": "Button",
        },
        "InsideInsideButton" => {
          "childComponents": Set {},
          "childElements": Set {},
          "componentDetail": {
            "tagName": "InsideInsideButton",
          },
          "isFromNodeModules": true,
          "parentComponent": "InsideButton",
        },
      }
    `)
  })

  test('adds elements to ancestor component with tagName same as element file location', () => {
    const components: Map<ComponentFragment, ComponentWithChildren> = new Map([
      createComponent({ tagName: 'ViewHeader' }),
      createComponent({ tagName: 'DescendantWithElementFromAncestor', parent: 'ViewHeader' }),
    ])
    const elements: Map<SvelteElementDetail, ComponentFragment> = new Map([
      createElement({ tagName: 'DescendantWithElementFromAncestor', file: '.lib/view/ViewHeader.svelte' }),
    ])
    expect(connectParentsAndChildren(components, elements)).toMatchInlineSnapshot(`
      Map {
        "ViewHeader" => {
          "childComponents": Set {
            "DescendantWithElementFromAncestor",
          },
          "childElements": Set {
            {
              "__svelte_meta": {
                "loc": {
                  "file": ".lib/view/ViewHeader.svelte",
                },
              },
            },
          },
          "componentDetail": {
            "tagName": "ViewHeader",
          },
          "parentComponent": undefined,
        },
        "DescendantWithElementFromAncestor" => {
          "childComponents": Set {},
          "childElements": Set {},
          "componentDetail": {
            "tagName": "DescendantWithElementFromAncestor",
          },
          "isFromNodeModules": false,
          "localFilenameUsedIn": ".lib/view/ViewHeader.svelte",
          "parentComponent": "ViewHeader",
        },
      }
    `)
  })

  test('elements from a node_modules component that also happen to have local elements inside that component borrow their location from the local element so they can be moved into having the most logical parent component - where they are written', () => {
    const components: Map<ComponentFragment, ComponentWithChildren> = new Map([
      createComponent({ tagName: 'Main' }),
      createComponent({ tagName: 'Layout', parent: 'Main' }),
      createComponent({ tagName: 'Button', parent: 'Layout' }),
    ])
    const elements: Map<SvelteElementDetail, ComponentFragment> = new Map([
      createElement({ tagName: 'Button', file: 'lib/Main.svelte' }),
      createElement({ tagName: 'Button', file: 'foo/node_modules/svelte-pieces/Button.svelte' }),
    ])
    expect(connectParentsAndChildren(components, elements)).toMatchInlineSnapshot(`
      Map {
        "Main" => {
          "childComponents": Set {
            "Layout",
          },
          "childElements": Set {
            {
              "__svelte_meta": {
                "loc": {
                  "file": "lib/Main.svelte",
                },
              },
            },
            {
              "__svelte_meta": {
                "loc": {
                  "file": "foo/node_modules/svelte-pieces/Button.svelte",
                },
              },
            },
          },
          "componentDetail": {
            "tagName": "Main",
          },
          "parentComponent": undefined,
        },
        "Layout" => {
          "childComponents": Set {
            "Button",
          },
          "childElements": Set {},
          "componentDetail": {
            "tagName": "Layout",
          },
          "parentComponent": "Main",
        },
        "Button" => {
          "childComponents": Set {},
          "childElements": Set {},
          "componentDetail": {
            "tagName": "Button",
          },
          "isFromNodeModules": true,
          "localFilenameUsedIn": "lib/Main.svelte",
          "parentComponent": "Layout",
        },
      }
    `)
  })
})
