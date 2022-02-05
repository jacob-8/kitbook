import { svelte } from '@sveltejs/vite-plugin-svelte';
import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node';
import { defaultThemePlugin, DefaultThemeConfig } from '@vitebook/theme-default/node';
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node';
import preprocess from 'svelte-preprocess';

export default defineConfig<DefaultThemeConfig>({
  include: ['src/**/*.md', 'src/**/*.story.svelte'],
  alias: {
    $lib: '/src/lib',
  },
  plugins: [
    svelteMarkdownPlugin({
      code: {
        lineNumbers: false,
      },
    }),
    shikiMarkdownPlugin({
      langs: ['html', 'css', 'js', 'ts', 'svelte'],
      theme: 'dark-plus',
    }),
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
    svelte({
      extensions: ['.svelte', '.md'],
      preprocess: preprocess({
        defaults: {
          style: 'postcss',
        },
        postcss: true,
      }),
    }),
  ],
  site: {
    title: 'Svelte Pieces',
    description: 'Useful Svelte UI pieces for building web apps.',
    theme: {
      sidebar: {
        style: 'explorer',
        categories: true,
      },
      markdown: {
        toc: true,
        editLink: true,
        editLinkText: 'Edit on GitHub',
        prevLink: true,
        nextLink: true,
        lastUpdated: true,
      },
      remoteGitRepo: {
        url: 'jacobbowdoin/svelte-pieces',
      },
    },
  },
  vite: {
    server: {
      hmr: {
        clientPort: process.env.HMR_HOST ? 443 : 3000,
        host: process.env.HMR_HOST
          ? process.env.HMR_HOST.substring('https://'.length)
          : 'localhost',
      },
    },
  },
});
