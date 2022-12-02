import viteConfig from './vite.config';
process.env.KITBOOK = true;

// Can learn from others who add settings to a default Vite.config file and do this in a better fashion to allow users to customize settings here

// https://github.com/rixo/svench, UnoCss
// https://github.com/vitebook/vitebook, https://github.com/vessel-js/vessel

if (!viteConfig.server) viteConfig.server = {};
viteConfig.server.port = '4321';
viteConfig.cacheDir = "node_modules/.vite-kitbook"
// viteConfig.server.fs = {
//   allow: ['..'] // allow serving files from one level up to the project root for displaying README.md
// };

export default viteConfig;