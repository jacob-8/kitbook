import viteConfig from './vite.config';
process.env.KITBOOK = true;

if (!viteConfig.server) viteConfig.server = {};
viteConfig.server.port = '4321';
// viteConfig.server.fs = {
//   allow: ['..'] // allow serving files from one level up to the project root for displaying README.md
// };

export default viteConfig;