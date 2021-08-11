import path from 'path';
import { fileURLToPath } from 'url';

// note: Kit apps are type:module, so Node's __dirname is not available
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  vite: {
    resolve: {
      alias: {
        $app: path.resolve(__dirname, '.svelte-kit/dev/runtime/app'),
        $lib: path.resolve(__dirname, 'src/lib')
      }
    }
  }
};