Learned from the [Typescript in CodeMirror thread](https://discuss.codemirror.net/t/codemirror-6-and-typescript-lsp/3398) and the initial implementation here was taken from https://github.com/val-town/codemirror-ts - we should move to the worker version for better performance as opportunity permits.

The `path` property can be used to set up two different editors sharing the same Typescript filesystem but that probably won't be needed by Kitbook.

This implementation has a tab trap, press Escape + Tab to get out.