import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

// keeps using localhost https://github.com/vitejs/vite/issues/9195
import dns from 'dns';
dns.setDefaultResultOrder('verbatim');

const config: UserConfig = {
  plugins: [
    sveltekit(),
  ],
  define: {
    'import.meta.vitest': false,
  },
  build: {
    target: 'es2015', //es6
  },
  test: {
    globals: true,
    includeSource: ['src/**/*.ts'],
  },
};

export default config;
