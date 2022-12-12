import viteConfig from './vite.config';
process.env.KITBOOK = true;

// https://github.com/vitebook/vitebook, https://github.com/vessel-js/vessel

const kitbookViteConfig = {
  server: {
    port: '4321',
    fs: {
      allow: ['..'] // allow serving files from one level up to the project root for displaying README.md
    }
  },
  cacheDir: "node_modules/.vite-kitbook",
}

export default Object.assign(viteConfig, kitbookViteConfig);