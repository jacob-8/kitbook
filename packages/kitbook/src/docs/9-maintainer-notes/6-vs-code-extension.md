# VSCode Kitbook Extension

There is a not-yet-published Kitbook VSCode extension (`jacob-8.kitbook-vscode`) which can be manually installed using the `packages\vscode\kitbook-vscode-0.0.1.vsix` file in this repo.

At present it serves to easily allow you to toggle on/off the treatment of markdown files as `svelte` files to enable you to go back and forth between markdown and svelte language services in the same `.md` file.

After installing the extension, add the following keybinding (adjust as you desire) to your keyboard shortcuts by opening the Command Palette (Ctrl+p on Windows) and select `Preferences: Open Keyboard Shortcuts (JSON)`. Add the following:

```json title="keybindings.json"
{
  "key": "alt+x",
  "command": "kitbook.toggleMdFileAssociation"
}
```

Then any time you press that keybinding, the association will be flipped:

```txt title=".vscode/settings.json" {2}
"files.associations": {
  "*.md": "svelte", // toggles this line on/off
  "*.foo": "bar" // ignores other associations if they exist
},
```

Every Svelte developer knows how great the Svelte Language Tools are, but there's also some pretty convenient markdown languages features out there like easy link pasting or making a selection **bold** upon pressing `ctrl+b` if you have the [Markdown All in One extension](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) installed). Toggling between language associations lets us take advantage of both languages.

## Future plans

With the recent move to using Compositions instead of Stories, and with the addition of the Viewer to easily add workbench files, this extension may not actually be needed...