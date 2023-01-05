# Kitbook VSCode Extension

At present this extension serves to easily allow you to toggling on/off the treatment of markdown files as `svelte` files to enable you to go back and forth between markdown and svelte language services in the same `.md` file. 

```json
"files.associations": {
  "*.md": "svelte" // toggles this line on/off
},
```

After installing the extension (manually install from the `vsix` file in this package until extension is placed into the store), add the following keybinding (adjust as you desire) to your keyboard shortcuts by opening the Command Palette (Ctrl+p on Windows) and select `Preferences: Open Keyboard Shortcuts (JSON)`. Add the following:

```json
{
  "key": "alt+x",
  "command": "kitbook.toggleMdFileAssociation"
}
```

Then any time you press that keybinding, the association will be flipped.

## Requirements

For use with [Kitbook](https://kitbook.vercel.app/)
## TODO: Backlinking
`\[\[(.+?)\]\]` will detect wikilinks
- https://github.com/hikerpig/foam-template-gatsby-kb
- https://github.com/hikerpig/gatsby-project-kb
- https://github.com/mathieudutour/foam-gatsby-template

<!-- ## Extension Settings -->

<!-- Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something. -->

<!-- ## Known Issues -->

## Release Notes

Not yet published but you can install it manually from the `.vsix` file in this package.

<!-- Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z. -->

<!-- * [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines) -->


## Misc

Learning from https://code.visualstudio.com/api and https://github.com/rebornix/vscode-toggle, https://medium.com/hack-visual-studio-code/toggle-any-setting-in-vs-code-using-keyboard-shortcut-arguments-cdb5ddc56955, https://github.com/unocss/unocss/blob/main/packages/vscode/README.md, https://github.com/sebsojeda/vscode-svx, https://github.com/Microsoft/vscode-sublime-keybindings
