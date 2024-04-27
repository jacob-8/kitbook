Originally thought I would use window posted messages to talk between the app or main Kitbook window and the tools window, like this: 

```ts title="main page"
window.addEventListener('message', event => console.info(event.data))
const toolsWindow = window.open('/tools', '_blank', 'width=600,height=400')
toolsWindow.postMessage('Hello from the main window!', '*')
// toolsWindow.addEventListener('beforeunload', () => console.info('toolsWindow is being closed'))
// toolsWindow.focus()
```

and 

```ts title="tools"
window.addEventListener('message', event => console.info(event.data))
window.opener.postMessage('Hello from the new window!', '*')
```

but that connection is broken if either window is reloaded. So now sending messages via Vite's [Client-server Communication](https://vitejs.dev/guide/api-plugin#client-server-communication) `import.meta.hot.send` option.