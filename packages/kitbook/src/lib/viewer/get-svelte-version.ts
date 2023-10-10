let svelteVersion: string
document.addEventListener('SvelteRegisterBlock', e => svelteVersion = e.detail.version, { once: true })
console.log({ svelteVersion })
